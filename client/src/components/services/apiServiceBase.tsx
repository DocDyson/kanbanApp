import axios, { AxiosResponse } from "axios";

export abstract class ApiServiceBase {
    apiUrl: string;
    responseData: Object[] = [];
    error: string = '';
    isSuccess: boolean = false;
    config: Object = {};
    token: string = '';

    abstract parsedData: any | any[];
    abstract handleGetResponse(response: AxiosResponse): void;
    abstract handlePostResponse(response: AxiosResponse): void;
    abstract handlePutResponse(response: AxiosResponse): void;
    abstract handleDeleteResponse(response: AxiosResponse): void;

    public async get(): Promise<string[] | void> {
        return axios.get(this.apiUrl, this.config)
            .then(response => {
                this.handleGetResponse(response);
            })
            .catch((e) => this.handleError(e));
    }

    public async post(data: any, resourceId?: number, action?: string): Promise<string[] | void> {
        let resourceURL = this.apiUrl;
        if (resourceId && action) resourceURL += `${resourceId}/${action}/`;

        return axios.post(resourceURL, data, this.config)
            .then(response => {
                this.handlePostResponse(response);
            })
            .catch((e) => this.handleError(e));
    }

    public async put(data: any, resourceId?: number): Promise<string[] | void> {
        let resourceURL = this.apiUrl;
        if (resourceId) resourceURL += `${resourceId}/`

        return axios.patch(resourceURL, data, this.config)
            .then(response => {
                this.handlePutResponse(response);
            })
            .catch((e) => this.handleError(e));
    }

    public async delete(resourceId: number): Promise<string[] | void> {
        const resourceURL = this.apiUrl + `${resourceId}/`;
        return axios.delete(resourceURL, this.config)
            .then(response => {
                this.handleDeleteResponse(response);
            })
            .catch((e) => this.handleError(e));
    }

    private handleError = (error) => {
        this.isSuccess = false;
        this.error = error;
    }

    protected setAuthHeader = () => {
        this.config = {
            headers: {
                Authorization: `Token ${this.token}`,
            }
        }
    }

    constructor(apiUrl: string, token?: string) {
        this.apiUrl = apiUrl;
        this.token = token;
    }
}
