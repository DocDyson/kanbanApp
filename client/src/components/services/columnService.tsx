import { AxiosResponse } from "axios";
import { ApiServiceBase } from "./apiServiceBase";

export class ColumnService extends ApiServiceBase {
    parsedData;

    constructor(apiUrl: string, token: string) {
        super(apiUrl, token);
        this.setAuthHeader();
    }

    handlePutResponse(response: AxiosResponse): void {
        this.isSuccess = true;

        if (response.status !== 200) {
            this.isSuccess = false;
            return
        }
    }

    handleGetResponse(response: AxiosResponse): void {
        return;
    }

    handlePostResponse(response: AxiosResponse): void {
        this.isSuccess = true;

        if (![200, 201].includes(response.status)) {
            this.isSuccess = false;
            return
        }
    }

    handleDeleteResponse(response: AxiosResponse): void {
        return;
    }
}
