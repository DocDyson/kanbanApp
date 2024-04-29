import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";

export class RegisterService extends ApiServiceBase {
    parsedData;

    constructor(apiUrl: string) {
        super(apiUrl);
    }

    handleGetResponse(response: AxiosResponse): void {
        return;
    }

    handleDeleteResponse(response: AxiosResponse): void {
        return;
    }

    handlePutResponse(response: AxiosResponse): void {
        return;
    }

    handlePostResponse(response: AxiosResponse): void {
        this.isSuccess = true;

        if (response.status !== 204) {
            this.isSuccess = false;
        }
    }
}
