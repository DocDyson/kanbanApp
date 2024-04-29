import { UserModel } from "./User";

export class CommentModel {
    id: number;
    text: string;
    author: UserModel;

    constructor(id: number, text: string, author: UserModel) {
        this.id = id;
        this.text = text;
        this.author = author;
    }
}
