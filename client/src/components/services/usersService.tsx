import { UserModel } from "@models/User";
import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";

export class UsersService extends ApiServiceBase {
    parsedData: UserModel[];

    constructor(apiUrl: string, token: string) {
        super(apiUrl, token);
        this.setAuthHeader();
    }

    handlePutResponse(response: AxiosResponse): void {
        return
    }

    handleGetResponse(response: AxiosResponse): void {
        this.parsedData = [];
        this.isSuccess = true;

        if (response.status !== 200) {
            this.isSuccess = false;
            return;
        }

        response.data.forEach((user) => {
            const newUser = new UserModel(
                user.pk,
                user.first_name,
                user.last_name,
                user.email,
                user.description,
                '',
                user.avatar,
            );
            this.parsedData.push(newUser);
        })
    }

    handlePostResponse(response: AxiosResponse): void {
        return;
    }

    handleDeleteResponse(response: AxiosResponse): void {
        return;
    }
}
