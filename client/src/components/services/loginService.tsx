import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";
import { UserModel } from "@models/User";

export class LoginService extends ApiServiceBase {
    parsedData: UserModel;

    constructor(apiUrl: string) {
        super(apiUrl);
    }

    handlePutResponse(response: AxiosResponse): void {
        return;
    }

    handleGetResponse(response: AxiosResponse): void {
        return;
    }

    handleDeleteResponse(response: AxiosResponse): void {
        return;
    }

    handlePostResponse(response: AxiosResponse): void {
        this.isSuccess = true;

        if (response.status !== 200) {
            this.isSuccess = false;
            return;
        }

        this.parsedData = new UserModel(
            response.data.user.pk,
            response.data.user.first_name,
            response.data.user.last_name,
            response.data.user.email,
            response.data.user.description,
            response.data.key,
            response.data.user.avatar,
        )
    }
}
