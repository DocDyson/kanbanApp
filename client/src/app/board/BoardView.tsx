'use client'

import Board from '@components/board/Board'
import { BoardService } from '@components/services/boardService'
import { useBoardActions, useBoardStore } from '@stores/boardStore'
import React, { memo, useEffect } from 'react'

import { ApiUrls } from '@components/consts/apiURLs'
import { useUserStore } from '@stores/userStore'

import eventEmitter from '@components/services/eventEmitter'
import { TaskModal } from '@components/modal/TaskModal'
import { ColumnModal } from '@components/modal/ColumnModal'
import { BoardModal } from '@components/modal/BoardModal'
import { UsersService } from '@components/services/usersService'
import { redirect } from 'next/navigation'
import { CommentModal } from '@components/modal/CommentModal'

function BoardView() {
	const { isLogged, user } = useUserStore();
	const { boards, currentBoard } = useBoardStore()
	const { setSelectedBoard, setBoards, setUsers } = useBoardActions()

	const boardService = new BoardService(ApiUrls.board, user.key);
	const usersService = new UsersService(ApiUrls.users, user.key);

	useEffect(() => {
		if (!isLogged) redirect('/login/')
	}, [isLogged])

	useEffect(() => {
		eventEmitter.on('reload', fetchData);
		fetchData();

		return () => {
			eventEmitter.removeAllListeners();
		}
	}, [])

	useEffect(() => {
		if (boards.length > 0 && currentBoard) {
            const lastUsedBoard = boards.filter((board) => board.id === currentBoard.id)[0]
            setSelectedBoard(lastUsedBoard);
        } else if (boards.length > 0) {
            setSelectedBoard(boards[0])
        } else {
            setSelectedBoard(null);
        }
	}, [boards])

	const fetchBoardData = async (): Promise<any> => {
		await boardService.get();
		if (boardService.isSuccess) {
			setBoards(boardService.parsedData);
		}
	}

	const fetchUsersData = async (): Promise<any> => {
		await usersService.get();
		if (usersService.isSuccess) {
			setUsers(usersService.parsedData);
		}
	}

	const fetchData = (): void => {
		fetchBoardData();
		fetchUsersData();
	}

	return (
		<>
			<Board board={currentBoard} />
			<TaskModal />
			<ColumnModal />
			<BoardModal />
			<CommentModal />
		</>
	)
}

export default memo(BoardView)
