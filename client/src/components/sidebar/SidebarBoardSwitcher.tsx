'use client'

import { useBoardActions, useBoardStore } from '@stores/boardStore'
import { BoardModel } from '@models/Board'
import { BoardService } from '@components/services/boardService'
import { ApiUrls } from '@components/consts/apiURLs'
import eventEmitter from '@components/services/eventEmitter';
import { Dropdown, Button } from 'flowbite-react'
import { FaPlus } from "react-icons/fa6";
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '@stores/userStore'
import { HiDotsVertical } from "react-icons/hi";
import SidebarButton from './SidebarButton'
import { TbTemplate } from "react-icons/tb";
import { cn } from '@lib/utils'

function SidebarBoardSwitcher() {
    const { user } = useUserStore();
    const { boards, currentBoard } = useBoardStore()
    const { setSelectedBoard, setBoardModal } = useBoardActions()

    const boardService = new BoardService(ApiUrls.board, user.key);
    const currentPath = usePathname()
    const router = useRouter();

    const handleChangeBoardClick = (board: BoardModel): void => {
        setSelectedBoard(board)
        if (!isBoardView()) {
            router.push('/board');
        }
    }

    const handleAddNewBoardClick = (): void => {
        setBoardModal(true, null);
    }

    const handleEditBoardClick = (board): void => {
        setBoardModal(true, board);
    }

    const handleDeleteBoardClick = async (board): Promise<any> => {
        await boardService.delete(board.id);
        eventEmitter.emit('reload');
    }

    const isBoardView = (): boolean => {
        return currentPath === '/board';
    }

    const isActive = (board: BoardModel): boolean => {
        return board === currentBoard;
    }

    return (
        <div>
            <h3 className='px-8 uppercase text-gray-medium text-sm font-bold tracking-widest'>
                All Boards ({boards.length})
            </h3>
            <div className='grid gap-4 mt-6'>
                {boards.map((board, index) => (
                    <SidebarButton key={index} isActive={isActive(board)} onClick={() => handleChangeBoardClick(board)}>
                        <div className='flex flex-1 justify-between items-center'>
                            <div className='flex items-center gap-5'>
                                <TbTemplate className={cn('w-5 h-5 dark:text-white', { 'text-black': !isActive(board) })} />
                                <span className={cn('dark:text-white', {
                                    'text-black': !isActive(board),
                                })}>
                                    {board.title}
                                </span>
                            </div>
                            <Dropdown label="" placement="right-start" renderTrigger={() => <Button size="xs"><HiDotsVertical className={cn('w-5 h-5 dark:text-white', { 'text-black': !isActive(board) })} /></Button>}>
                                <Dropdown.Item onClick={() => handleEditBoardClick(board)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDeleteBoardClick(board)} className='!text-red-600'>Remove</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </SidebarButton>
                ))}
                {isBoardView() && (
                    <Button onClick={handleAddNewBoardClick} color="purple" pill className='w-fit px-2 mx-auto'>
                        <FaPlus className={"w-5 h-5 mr-2"} /> Add new board
                    </Button>
                )}
            </div>
        </div>
    )
}

export default SidebarBoardSwitcher
