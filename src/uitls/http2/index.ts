import Axios, {AxiosError, AxiosInstance, AxiosRequestConfig, CustomParamsSerializer} from "axios";
import {
    HttpClientV2Error,
    HttpClientV2RequestConfig,
    HttpClientV2Response,
    RequestConfig,
    RequestMethods
} from "./types.d";
import {stringify} from "qs";
import {useUserStoreHook} from "@/store/modules/user";

const {VITE_BASE_URL2} = import.meta.env
const message = (title: string, message: string, showMessage: boolean) => {
    if (!showMessage) {
        return
    }
    /* showDialog({title, message}).then(r => {

     })*/
}

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
    // 请求超时时间
    baseURL: VITE_BASE_URL2,
    timeout: 60000,
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    },
    // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
    paramsSerializer: {
        serialize: stringify as unknown as CustomParamsSerializer
    }
};

class HttpClientV2 {
    constructor() {
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }

    /** 初始化配置对象 */
    private static initConfig: HttpClientV2RequestConfig = {};

    /** 保存当前Axios实例对象 */
    private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

    /** 请求拦截 */
    private httpInterceptorsRequest(): void {
        HttpClientV2.axiosInstance.interceptors.request.use(
            async (config: any) => {
                // 开启进度条动画
                //NProgress.start();
                // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
                if (typeof config.beforeRequestCallback === "function") {
                    config.beforeRequestCallback(config);
                    return config;
                }
                if (HttpClientV2.initConfig.beforeRequestCallback) {
                    HttpClientV2.initConfig.beforeRequestCallback(config);
                    return config;
                }
                /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
                const whiteList = ["/refreshToken", "/login"];
                return whiteList.some(v => config.url.startsWith(v))
                    ? config
                    : new Promise(resolve => {
                        config.data = config.data ?? {}
                        //添加公共参数
                        config.headers["cyber-range-uid"] = useUserStoreHook().uid
                        config.headers["cyber-range-sid"] = useUserStoreHook().token
                        //config.headers["cr-device-id"] = useBaseStoreHook().getDeviceId();
                        const accessTokenV2 = useUserStoreHook().userInfo?.token;
                        if (accessTokenV2) {
                            config.headers["access-token-v2"] = accessTokenV2;
                            resolve(config);
                        } else {
                            resolve(config);
                        }
                    });
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    /** 响应拦截 */
    private httpInterceptorsResponse(): void {
        const instance = HttpClientV2.axiosInstance;
        instance.interceptors.response.use(
            (response: HttpClientV2Response) => {
                const $config = response.config;
                // 关闭进度条动画
                //NProgress.done();
                // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
                if (typeof $config.beforeResponseCallback === "function") {
                    $config.beforeResponseCallback(response);
                    return response.data;
                }
                if (HttpClientV2.initConfig.beforeResponseCallback) {
                    HttpClientV2.initConfig.beforeResponseCallback(response);
                    return response.data;
                }
                return response.data;
            },
            (error: HttpClientV2Error) => {
                const $error = error;
                $error.isCancelRequest = Axios.isCancel($error);
                // 关闭进度条动画
                // NProgress.done();
                // 所有的响应异常 区分来源为取消请求/非取消请求
                return Promise.reject($error);
            }
        );
    }

    /** 通用请求工具函数 */
    public request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: HttpClientV2RequestConfig
    ): Promise<T> {
        const config = {
            method,
            url,
            ...param,
            ...axiosConfig
        } as HttpClientV2RequestConfig;

        // 单独处理自定义请求/响应回掉
        return new Promise((resolve, reject) => {
            HttpClientV2.axiosInstance
                .request(config)
                .then((response: undefined) => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public postApi<DATA>(
        url: string,
        data: any,
        conf?: RequestConfig
    ): Promise<DATA> {
        if (!conf) {
            conf = [] as AxiosRequestConfig;
        }
        conf["data"] = data;
        return this.reqApi(url, conf, "post");
    }

    public getApi<DATA>(
        url: string,
        params: any,
        conf?: RequestConfig
    ): Promise<DATA> {
        if (!conf) {
            conf = [] as AxiosRequestConfig;
        }
        conf["params"] = params;
        return this.reqApi(url, conf, "get");
    }

    private reqApi<DATA>(
        url: string,
        param: RequestConfig,
        method: RequestMethods
    ): Promise<DATA> {
        param.showMessage = param.showMessage === undefined ? true : param.showMessage
        return new Promise((resolve, reject) => {
            return this.request<BaseRespModel<DATA>>(method, url, param)
                .then((dataJsonObj: BaseRespModel<DATA>) => {
                    if (param['responseType'] === 'blob') {
                        resolve(dataJsonObj as any)
                        return
                    }
                    const data = new BaseRespModel<DATA>();
                    Object.assign(data, dataJsonObj);

                    if (data.isSuccess()) {
                        resolve(data.data);
                    } else {
                        if(data.message.indexOf('用户不存在')>=0){
                            useUserStoreHook().clean()
                            location.reload()
                            return;
                        }
                        if (String(data.code).endsWith("999000")) {
                            message("登录状态失效", "", param.showMessage);
                            //loginUtils.logout();
                        } else {
                            message("接口异常", data.message, param.showMessage);
                        }
                        reject(data);
                    }
                }).catch(err => {
                    if (err instanceof AxiosError) {
                        const code = err.response?.data?.code;
                        if (String(code).endsWith("999000")) {
                            message("登录状态失效", "", param.showMessage);
                            //useLogin().toLogin()
                            reject(err);
                            return;
                        }
                    }

                    if (err instanceof Error) {
                        message("接口异常", err.message, param.showMessage);
                    } else if (err instanceof BaseRespModel<any>) {
                        message("接口异常", err.message, param.showMessage);
                    } else {
                        message("接口异常", err, param.showMessage);
                    }
                    reject(err);
                });
        });
    }
}

export class BaseRespModel<T> {
    code: string;
    message: string;
    data: T;

    isSuccess(): boolean {
        return this.code == "0";
    }
}

export const http = new HttpClientV2();
