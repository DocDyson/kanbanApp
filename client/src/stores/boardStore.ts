import { create } from 'zustand'
import { BoardModel } from '@models/Board'
import { ColumnModel } from '@models/Column';
import { TaskModel } from '@models/Task';
import { UserModel } from '@models/User';
import { CommentModel } from '@models/Comment';

interface BoardState {
    boards: BoardModel[];
    users: UserModel[];
    currentBoard?: BoardModel | null;
    modals: {
        comments: {
            show: boolean;
            taskId?: number | null;
            comments?: CommentModel[] | null;
        }
        task: {
            show: boolean;
            actionType?: string | null;
            columnId?: number | null;
            task?: TaskModel | null;
        },
        board: {
            show: boolean;
            board: BoardModel | null;
        },
        column: {
            show: boolean;
            column?: ColumnModel | null;
        },
    }
}

interface BoardActions {
    actions: {
        setBoards: (boards: BoardModel[]) => void
        setUsers: (users: UserModel[]) => void
        setSelectedBoard: (board: BoardModel) => void
        setTaskModal: (show: boolean, actionType?: string, columnId?: number | null, task?: TaskModel | null) => void
        setBoardModal: (show: boolean, board: BoardModel) => void
        setColumnModal: (show: boolean, column?: ColumnModel | null) => void
        setCommentsModal: (show: boolean, taskId?: number, comments?: CommentModel[]) => void
    }
}

export const useBoardStore = create<BoardState & BoardActions>()((set) => ({
    boards: [],
    users: [],
    currentBoard: null,
    modals: {
        comments: {
            show: false,
            taskId: null,
            comments: [],
        },
        task: {
            show: false,
            actionType: null,
            columnId: null,
            task: null,
        },
        board: {
            show: false,
            board: null,
        },
        column: {
            show: false,
            column: null,
        },
    },
    actions: {
        setBoards: (boards) => set(() => ({ boards })),
        setUsers: (users) => set(() => ({ users })),
        setSelectedBoard: (currentBoard) => set(() => ({ currentBoard })),
        setTaskModal: (show, actionType, columnId = null, task = null) => set((state) => ({ modals: { ...state.modals, task: { show, actionType, columnId, task } } })),
        setColumnModal: (show, column = null) => set((state) => ({ modals: { ...state.modals, column: { show, column } } })),
        setBoardModal: (show, board = null) => set((state) => ({ modals: { ...state.modals, board: { show, board } } })),
        setCommentsModal: (show, taskId, comments) => set((state) => ({ modals: { ...state.modals, comments: { show, taskId, comments } } })),
    },
}))

export const useBoardActions = () => useBoardStore((state) => state.actions)
