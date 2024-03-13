import {RequestConfig} from "@/uitls/http2/types";
import {http} from "@/uitls/http2";

// 在线总人数
export const onlineStatistics = async <T>(config?: RequestConfig) => {
    return http.getApi<T>("/match/user/onlineStatistics", null, config);
}
// 初赛：排行 1总分、2CTF题、3数据分析
export const allRanking = async <T>(page: number, pageSize: number, config?: RequestConfig) => {
    return http.getApi<T>("/match/ranking/allData", {page, pageSize}, config);
}
// 决赛：排行 1总分、2攻击、3防守
export const finalRankingAll = async <T>(page: number, pageSize: number, config?: RequestConfig) => {
    return http.getApi<T>("/match/final/rankingAllData", { page, pageSize}, config);
}
// 初赛：FLAG提交
export const flagPage = async <T>(page: number, pageSize: number, config?: RequestConfig) => {
    return http.getApi<T>("/match/flag/page", {page, pageSize}, config);
}

// 比赛概览
export const compInfo = async <T>(config?: RequestConfig) => {
    return http.getApi<T>("/match/summary", null, config);
}

// 机器列表
export const machineList = async <T>(config?: RequestConfig) => {
    return http.getApi<T>("/match/machine/list", null, config);
}

// 机器资源查询
export const machineMetrics = async <T>(ip: string, config?: RequestConfig) => {
    return http.getApi<T>("/match/machine/metrics", {ip}, config);
}

// 机器资源查询
export const singleMetrics = async <T>(ip: string, config?: RequestConfig) => {
    return http.getApi<T>("/match/machine/singleMetrics", {ip}, config);
}

// 决赛漏洞查询所有flag或者bug修复
export const allBugfixOrFlag = async <T>(config?: RequestConfig) => {
    return http.getApi<T>("/match/final/allBugfixOrFlag", null, config);
}

// 决赛漏洞查询单个flag或者bug修复明细
export const allBugfixOrFlagDetail = async <T>(id, bugType,pageSize, config?: RequestConfig) => {
    return http.getApi<T>("/match/final/allBugfixOrFlagDetail", {id, bugType,pageSize}, config);
}


// 算法查询
export const allRecList = async <T>(page:number,pageSize:number, config?: RequestConfig) => {
    return http.getApi<T>("/match/reclist", {page, pageSize}, config);
}

// 用户登录
export const loginByPwd = async <T>(username: string, password: string, config?: RequestConfig) => {
    return http.postApi<T>("/match/user/loginByPwd", {username, password}, config);
}
