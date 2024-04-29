import { useEffect, useState } from 'react';
import { Modal, TextInput, Label, Button } from 'flowbite-react'
import { useBoardActions, useBoardStore } from '@stores/boardStore';
import { ApiUrls } from '@components/consts/apiURLs';
import eventEmitter from '@components/services/eventEmitter';
import { ColumnService } from '@components/services/columnService';
import { useUserStore } from '@stores/userStore';

export function ColumnModal() {
    const { user } = useUserStore();
    const { currentBoard, modals } = useBoardStore();
    const { setColumnModal } = useBoardActions();

    const columnService = new ColumnService(ApiUrls.column, user.key);

    const [columnTitle, setColumnTitle] = useState(modals.column.column?.title);

    useEffect(() => {
        setColumnTitle(modals.column.column?.title);
    }, [modals.column.show]);

    const handleTitleChanged = (e) => {
        setColumnTitle(e.target.value);
    }

    const handleColumnSubmit = async (e) => {
        if (modals.column.column) {
            const data = {
                title: columnTitle,
            }
            await columnService.put(data, modals.column.column?.id as number)
        } else {
            const data = {
                title: columnTitle,
                board: currentBoard.id,
            }
            await columnService.post(data)
        }

        if (columnService.isSuccess) {
            setColumnModal(false);
            eventEmitter.emit('reload');
        }
    }

    return (
        <Modal show={modals.column.show} size="lg" onClose={() => setColumnModal(false)} dismissible>
            <Modal.Header>
                {modals.column.column ? 'Edit column' : 'Add column'}
            </Modal.Header>
            <Modal.Body>
                <div className="mb-2">
                    <Label htmlFor="taskName" value="Column name" />
                </div>
                <TextInput value={columnTitle} onChange={handleTitleChanged} id="taskName" type="text" placeholder={modals.column.column?.title} required />
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleColumnSubmit}>Save</Button>
                <Button color="gray" onClick={() => setColumnModal(false)}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
