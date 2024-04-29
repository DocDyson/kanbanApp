import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";
import { CommentModel } from "@models/Comment";
import { UserModel } from "@models/User";

export class CommentsService extends ApiServiceBase {
    parsedData: CommentModel;

    constructor(apiUrl: string, token: string) {
        super(apiUrl, token);
        this.setAuthHeader();
    }

    handlePutResponse(response: AxiosResponse): void {
        return;
    }

    handleGetResponse(response: AxiosResponse): void {
        return;
    }

    handlePostResponse(response: AxiosResponse): void {
        this.isSuccess = true;

        if (response.status !== 201) {
            this.isSuccess = false;
        }

        const author = new UserModel(
            response.data.author.pk,
            response.data.author.first_name,
            response.data.author.last_name,
            response.data.author.email,
            response.data.author.description,
            '',
            response.data.author.avatar,
        )

        const newComment = new CommentModel(
            response.data.pk,
            response.data.text,
            author,
        )

        this.parsedData = newComment;
    }

    handleDeleteResponse(response: AxiosResponse): void {
        return;
    }
}
