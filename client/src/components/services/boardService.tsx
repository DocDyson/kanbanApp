import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";
import { BoardModel } from "@models/Board";
import { ColumnModel } from "@models/Column";
import { TaskModel } from "@models/Task";
import { CommentModel } from "@models/Comment";
import { UserModel } from "@models/User";

export class BoardService extends ApiServiceBase {
    parsedData: BoardModel[] = [];

    constructor(apiUrl: string, token: string) {
        super(apiUrl, token);
        this.setAuthHeader();
    }

    handleGetResponse(response: AxiosResponse): void {
        this.parsedData = [];
        this.isSuccess = true;

        if (response.status !== 200) {
            this.isSuccess = false;
            return;
        }

        response.data.forEach((board) => {
            const columns: ColumnModel[] = []

            board.columns.forEach((column) => {
                const tasks: TaskModel[] = []

                column.tasks.forEach((task) => {
                    const comments: CommentModel[] = [];

                    task.comments.forEach((comment) => {
                        const author = new UserModel(
                            comment.author.pk,
                            comment.author.first_name,
                            comment.author.last_name,
                            comment.author.email,
                            comment.author.description,
                            '',
                            comment.author.avatar,
                        )

                        const newComment = new CommentModel(
                            comment.pk,
                            comment.text,
                            author
                        )

                        comments.push(newComment);
                    })

                    const newTask = new TaskModel(task.pk, task.title, task.user, task.column, task.description, task.order, comments);
                    tasks.push(newTask);
                })

                const newColumn = new ColumnModel(column.pk, column.title, tasks, column.order);
                columns.push(newColumn);
            })

            const newBoard = new BoardModel(board.pk, board.title, columns);
            this.parsedData.push(newBoard)
        })
    }

    handlePostResponse(response: AxiosResponse<any, any>): void {
        this.isSuccess = true;

        if (response.status !== 201) {
            this.isSuccess = false;
        }
    }

    handlePutResponse(response: AxiosResponse<any, any>): void {
        this.isSuccess = true;

        if (response.status !== 200) {
            this.isSuccess = false;
        }
    }

    handleDeleteResponse(response: AxiosResponse<any, any>): void {
        return;
    }
}
