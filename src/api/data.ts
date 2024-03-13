import {http} from "@/uitls/http";
import {RequestConfig} from "@/uitls/http/types";

// 任务统计
export const taskStatistics = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/courseAssignment/statistics", data, config);
}

// 获取任务按标签分页统计数据
export const taskTagPage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/courseAssignment/tagPage", data, config);
}

// 课程统计
export const courseStatistics = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/course/statistics", data, config);
}

// 课程按老师开设课程平均数统计
export const averageByTeacher = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/course/averageByTeacher", data, config);
}

// 课程总未截止任务数统计
export const avgUnfinished = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/courseAssignment/avgUnfinished", data, config);
}

// 课程学生平均数折线
export const averageStudentCnt = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/course/averageStudentCnt", data, config);
}

// 场景统计数
export const configStatistics = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/configuration/statistics", data, config);
}

// 获取场景按标签分页统计数据
export const configTagPage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/configuration/tagPage", data, config);
}

// 分页获取所有课程
export const coursePage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/course/page", data, config);
}

// 分页获取所有实例
export const instancePage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/instance/page", data, config);
}

// 分页获取所有学员
export const userPage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/user/page", data, config);
}

// 获取运行实例统计数据
export const instanceStatistics = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/instance/statistics", data, config);
}

// 获取运行实例按标签分页统计数据
export const instanceTagPage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/instance/tagPage", data, config);
}

// 获取在线用户统计数据
export const onlineStatistics = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/user/onlineStatistics", data, config);
}

// 运行容器虚拟机交换机总数折线
export const deviceStatistics = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/instance/deviceStatistics", data, config);
}

// 获取实例资源
export const instanceResource = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/pve/instanceResource", data, config);
}

// 获取系统资源
export const sysResource = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/pve/sysResource", data, config);
}

// 单个学员所开启的资源消耗实例排行
export const userInstanceRank = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/user/instanceRank", data, config);
}

// 分页获取课程任务
export const courseAssignmentPage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.getApi<T>("/panel/courseAssignment/page", data, config);
}

// 课程人员得分排行分页
export const coursePointPage = async <T>(data: Object = {}, config?: RequestConfig) => {
    return http.postApi<T>("/panel/course/pointPage", data, config);
}

