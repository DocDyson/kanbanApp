import { CommentModel } from "./Comment";

export class TaskModel {
    id: number;
    title: string;
    user?: number;
    column?: number;
    description?: string;
    order?: number;
    comments?: CommentModel[];

    constructor(id: number, title: string, user?: number, column?: number, description?: string, order?: number, comments?: CommentModel[]) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.column = column;
        this.description = description;
        this.order = order;
        this.comments = comments;
    }
}
