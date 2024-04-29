import { useEffect, useState } from 'react';
import { Modal, TextInput, Label, Button } from 'flowbite-react';
import { useBoardActions, useBoardStore } from '@stores/boardStore';
import { ApiUrls } from '@components/consts/apiURLs';
import eventEmitter from '@components/services/eventEmitter';
import { BoardService } from '@components/services/boardService';
import { TbTemplate, TbTemplateOff } from "react-icons/tb";
import { useUserStore } from '@stores/userStore';

export function BoardModal() {
    const TemplateOptions = { none: 'none', bussiness: 'bussiness', development: 'development' };

    const { user } = useUserStore();
    const { modals } = useBoardStore()
    const { setBoardModal } = useBoardActions()

    const boardService = new BoardService(ApiUrls.board, user.key);

    const [boardTitle, setBoardTitle] = useState(modals.board.board?.title);
    const [template, setTemplate] = useState(TemplateOptions.none);

    useEffect(() => {
        setBoardTitle(modals.board.board?.title);
        setTemplate(TemplateOptions.none);
    }, [modals.board.show])

    const handleTitleChanged = (e): void => {
        setBoardTitle(e.target.value);
    }

    const handleBoardSubmit = async (): Promise<any> => {
        const data = {
            title: boardTitle,
            columns: [],
        }

        if (modals.board.board) {
            await boardService.put(data, modals.board.board.id);
        } else {
            switch (template) {
                case (TemplateOptions.bussiness):
                    data.columns = [
                        { title: 'Analysis', order: 0 },
                        { title: 'Design', order: 1 },
                        { title: 'User testing', order: 2 },
                        { title: 'Development', order: 3 },
                        { title: 'QA', order: 4 },
                    ];
                    break;
                case (TemplateOptions.development):
                    data.columns = [
                        { title: 'To do', order: 0 },
                        { title: 'Development', order: 1 },
                        { title: 'Code review', order: 2 },
                        { title: 'Testing', order: 3 },
                        { title: 'Closed', order: 4 },
                    ]
                    break;
                default:
                    data.columns = [];
                    break;
            }

            await boardService.post(data);
        }

        if (boardService.isSuccess) {
            setBoardModal(false, null);
            eventEmitter.emit('reload');
        }
    }

    return (
        <Modal show={modals.board.show} size="lg" onClose={() => setBoardModal(false, null)} dismissible>
            <Modal.Header>
                {modals.board.board ? 'Edit board' : 'Add board'}
            </Modal.Header>
            <Modal.Body>
                <div className="mb-2">
                    <Label htmlFor="taskName" value="Board title" />
                </div>
                <TextInput value={boardTitle} onChange={handleTitleChanged} id="taskName" type="text" placeholder="e.g. ToDo" required />
                {!modals.board.board && (
                    <>
                        <div className="mt-6 mb-2">
                            <Label value="Choose default board template" />
                        </div>
                        <div className='flex gap-2'>
                            <Button color="gray" className="flex-1" onClick={() => setTemplate(TemplateOptions.none)} outline={template === TemplateOptions.none}>
                                <div className="flex flex-col items-center gap-3">
                                    <span>Empty</span>
                                    <TbTemplateOff className="w-16 h-16" />
                                </div>
                            </Button>
                            <Button color="gray" className="flex-1" onClick={() => setTemplate(TemplateOptions.development)} outline={template === TemplateOptions.development}>
                                <div className="flex flex-col items-center gap-3">
                                    <span>Development</span>
                                    <TbTemplate className="w-16 h-16" />
                                </div>
                            </Button>
                            <Button color="gray" className="flex-1" onClick={() => setTemplate(TemplateOptions.bussiness)} outline={template === TemplateOptions.bussiness}>
                                <div className="flex flex-col items-center gap-3">
                                    <span>Business</span>
                                    <TbTemplate className="w-16 h-16" />
                                </div>
                            </Button>
                        </div>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleBoardSubmit}>Save</Button>
                <Button color="gray" onClick={() => setBoardModal(false, null)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}