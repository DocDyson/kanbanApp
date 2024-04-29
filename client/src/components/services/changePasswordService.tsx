import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";

export class ChangePasswordService extends ApiServiceBase {
    parsedData = null;

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

        if (response.status !== 200) {
            this.isSuccess = false;
        }
    }

    handleDeleteResponse(response: AxiosResponse): void {
        return;
    }
}
