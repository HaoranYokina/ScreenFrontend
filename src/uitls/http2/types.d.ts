import {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from "axios";

export type resultType = {
    accessToken?: string;
};

export type RequestMethods = Extract<
    Method,
    "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface HttpClientV2Error extends AxiosError {
    isCancelRequest?: boolean;
}

export interface HttpClientV2Response extends AxiosResponse {
    config: HttpClientV2RequestConfig;
}

export interface HttpClientV2RequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: HttpClientV2RequestConfig) => void;
    beforeResponseCallback?: (response: HttpClientV2Response) => void;
}

export interface RequestConfig extends AxiosRequestConfig {
    showMessage?: boolean
}

export default class HttpClientV2 {
    request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: HttpClientV2RequestConfig
    ): Promise<T>;

    post<T, P>(
        url: string,
        params?: T,
        config?: HttpClientV2RequestConfig
    ): Promise<P>;

    get<T, P>(
        url: string,
        params?: T,
        config?: HttpClientV2RequestConfig
    ): Promise<P>;
}
