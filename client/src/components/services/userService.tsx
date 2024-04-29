import { UserModel } from "@models/User";
import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";

export class UserService extends ApiServiceBase {
    parsedData: UserModel;
    token: string;

    constructor(apiUrl: string, token: string) {
        super(apiUrl, token);
        this.setAuthHeader();
    }

    handlePutResponse(response: AxiosResponse): void {
        this.isSuccess = true;

        if (response.status !== 200) {
            this.isSuccess = false;
            return;
        }

        this.parsedData = new UserModel(
            response.data.pk,
            response.data.first_name,
            response.data.last_name,
            response.data.email,
            response.data.description,
            '',
            response.data.avatar,
        )
    }

    handleGetResponse(response: AxiosResponse): void {
        return;
    }

    handlePostResponse(response: AxiosResponse): void {
        return;
    }

    handleDeleteResponse(response: AxiosResponse): void {
        return;
    }
}
