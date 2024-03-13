import {defineStore} from "pinia";
import {store} from "@/store";
import {reactive, ref} from "vue";
import {
    averageByTeacher,
    averageStudentCnt,
    avgUnfinished,
    configStatistics,
    configTagPage,
    courseAssignmentPage,
    coursePage,
    coursePointPage,
    courseStatistics,
    deviceStatistics,
    instancePage,
    instanceResource,
    instanceStatistics,
    instanceTagPage,
    onlineStatistics,
    sysResource,
    taskStatistics,
    taskTagPage,
    userInstanceRank,
    userPage
} from "@/api/data";


const useDataStore = defineStore('data', () => {
    const selectCourseOptions = ref([])
    const selectCourseAssignmentOptions = ref([])
    const coursePointList = reactive({
        titles: ['成绩', '姓名', '人员属性', '完成时间'],
        dataList: []
    })
    // 单个实例选择
    const selectInstanceOptions = ref(null)
    // 单个学员选择
    const selectStudentOptions = ref(null)

    //  任务总数
    const taskTotal = ref(0)
    // 任务统计
    const taskTagList = reactive([])

    // 课程总数
    const courseTotal = ref(0)
    // 平均开课数时序统计
    const courseAvgList = reactive([])
    // 未截止课程任务时序统计
    const courseUnfinishedList = reactive([])
    // 课程平均学生时序统计
    const courseAvgStudentList = reactive([])

    // 场景总数
    const sceneTotal = ref(0)
    // 场景统计
    const sceneList = reactive([])

    // 所有课程
    const courses = reactive([])

    // 所有课程任务
    const courseAssignments = reactive([])

    // 课程任务搜索关键词
    const courseAssignmentSearchKey = ref('')

    // 所有实例
    const instances = reactive([])

    // 学员实例
    const students = reactive([])

    // 容器
    const containers = reactive([])

    // 虚拟机
    const vms = reactive([])

    // 学员实例
    const exchanges = reactive([])

    // 实例柱状图
    const instanceTags = reactive([])

    // 实例统计
    const instanceStat = reactive({
        total: 0,
        totalEveryone: 0,
        totalGroup: 0,
        totalPersonal: 0
    })

    // 人数统计
    const userStat = reactive({
        total: 0,
        totalResearcher: 0,
        totalStudent: 0,
        totalTeacher: 0,
    })

    // 系统资源
    const sysResourceStat = reactive({
        cpuPercentage: "0.00%",
        diskPercentage: "0.00%",
        memoryPercentage: "0.00%",
    })

    // 单个实例统计
    const oneInstanceStat = reactive({
        cpuPercentage: 0,
        diskPercentage: 0,
        memoryPercentage: 0,
    })

    // 单个学员资源排行统计
    const oneStudentResourceStat = reactive({
        cpuPercentage: "",
        cpuRankNo: 0,
        diskPercentage: "",
        diskRankNo: 0,
        instanceCnt: 0,
        instanceRankNo: 1,
        memoryPercentage: "",
        memoryRankNo: 0,
        user: {username: ''}
    })

    const switchPage = (page) => {
        if (page === 1) {
            loadDataPageOne()
        } else {
            loadDataPageTwo()
        }
    }

    const loadDataPageOne = () => {
        loadTaskStatistics()
        loadAvgCourseByTeacher()
        loadCourseStatistics()
        loadAvgUnfinished()
        loadAvgStudentCnt()
        loadConfigStatistics()
        loadConfigTags()
        //loadCoursePage()
        loadCourseAssignmentPage()
    }


    const loadDataPageTwo = () => {
        loadInstancePage()
        loadStudentsPage()
        loadInstanceStatistics()
        loadInstanceTagPage()
        loadOnlineStatistics()
        loadDeviceStatistics1()
        loadDeviceStatistics2()
        loadDeviceStatistics3()
        loadSysResource()
    }

    //课程统计-老师平均开设课程数
    const loadAvgCourseByTeacher = () => {
        averageByTeacher<any>().then(res => {
            courseAvgList.length = 0
            let list = (res || [])
            list = list.map(item => ({key: item.statTime, value: item.total}))
            courseAvgList.push(...list)
        })
    }

    //课程统计-总未截止任务数
    const loadAvgUnfinished = () => {
        avgUnfinished<any>().then(res => {
            courseUnfinishedList.length = 0
            let list = (res || [])
            list = list.map(item => ({key: item.statTime, value: item.total}))
            courseUnfinishedList.push(...list)
        })
    }

    //课程统计-平均学生
    const loadAvgStudentCnt = () => {
        averageStudentCnt<any>().then(res => {
            courseAvgStudentList.length = 0
            let list = (res || [])
            list = list.map(item => ({key: item.statTime, value: item.total}))
            courseAvgStudentList.push(...list)
        })
    }

    // 课程总数
    const loadCourseStatistics = () => {
        courseStatistics().then(({total}) => {
            courseTotal.value = total || 0
        })
    }

    // 场景统计数
    const loadConfigStatistics = () => {
        configStatistics().then(({total}) => {
            sceneTotal.value = total || 0
        })
    }
    //场景统计柱状图
    const loadConfigTags = () => {
        configTagPage<any>({page: 1, pageSize: 10}).then(res => {
            sceneList.length = 0
            let list = (res.list || [])
            list = list.map(item => ({key: item.tagName, value: item.tagCnt, tagId: item.tagId}))
            sceneList.push(...list)
        })
    }

    // 加载任务统计
    const loadTaskStatistics = () => {
        taskStatistics<any>().then(res => {
            taskTotal.value = res.total
        })

        taskTagPage<any>({page: 1, pageSize: 5}).then(res => {
            taskTagList.length = 0
            let list = (res.list || [])
            list = list.map(item => ({key: item.tagName, value: item.tagCnt, tagId: item.tagId}))
            taskTagList.push(...list)
        })
    }

    //加载课程
    const loadCoursePage = () => {
        coursePage<any>({page: 1, pageSize: 100}).then(({list}) => {
            list = list || []
            list = list.map(item => ({label: item.courses.name, value: item.courses.id}))
            courses.length = 0
            courses.push(...list)
        })
    }


    //加载课程任务
    const loadCourseAssignmentPage = () => {
        return new Promise((resolve, reject) => {
            courseAssignmentPage<any>({
                page: 1,
                pageSize: 100,
                searchKey: courseAssignmentSearchKey.value
            }).then(({list}) => {
                list = list || []
                list = list.map(item => ({label: item.courseAssignment.title, value: item.courseAssignment.id}))
                courseAssignments.length = 0
                courseAssignments.push(...list)

                let values = selectCourseAssignmentOptions.value.map((item) => item.value)
                let selectItems = courseAssignments.filter(item => values.indexOf(item.value) >= 0)
                selectCourseAssignmentOptions.value.length = 0
                selectCourseAssignmentOptions.value.push(...selectItems)
                loadCoursePointPage()
                resolve(1)
            })

        })
    }

    const loadCoursePointPage = () => {
        const ids = (selectCourseAssignmentOptions.value || []).map(item => item.value)
        coursePointPage<any>({page: 1, pageSize: 9, courseAssignmentIdArr: ids}).then(({list}) => {
            list = list || []
            list = list.map(item => ({
                name: item.user.username,
                realName: item.user.realName || item.user.username,
                score: item.report.point,
                attr: item.assignment.target,
                time: item.report.submitTime ? new Date(item.report.submitTime.replaceAll('-', '/'))['format']('MM/dd hh:mm') : ' - '
            }))
            coursePointList.dataList.length = 0
            coursePointList.dataList.push(...list)
        })
    }


    // ------ page two -------


    // 查询所有实例
    const loadInstancePage = () => {
        instancePage<any>({page: 1, pageSize: 100}).then(({list}) => {
            list = list || []
            list = list.map(item => ({label: item.instance.name, value: item.instance.id}))
            instances.length = 0
            instances.push(...list)
            if (selectInstanceOptions.value && instances.length) {
                const instance = instances.find(item => item.value === selectInstanceOptions.value.value)
                selectInstanceOptions.value = instance
                loadInstanceResource()
            }
        })
    }

    // 查询所有学员
    const loadStudentsPage = () => {
        userPage<any>({page: 1, pageSize: 100, userGroup: 'student'}).then(({list}) => {
            list = list || []
            list = list.map(item => ({label: item.user.realName || item.user.username, value: item.user.id}))
            students.length = 0
            students.push(...list)
            if (selectStudentOptions.value && students.length) {
                const student = students.find(item => item.value === selectStudentOptions.value.value)
                selectStudentOptions.value = student
                loadUserInstanceRank()
            }
        })
    }

    // 查询运行实例统计数据
    const loadInstanceStatistics = () => {
        instanceStatistics<any>().then((res) => {
            Object.assign(instanceStat, res)
        })
    }

    //查询运行实例按标签分页统计数据
    const loadInstanceTagPage = () => {
        instanceTagPage<any>({page: 1, pageSize: 6}).then(res => {
            instanceTags.length = 0
            let list = (res.list || [])
            list = list.map(item => ({key: item.tagName, value: item.tagCnt, tagId: item.tagId}))
            instanceTags.push(...list)
        })
    }

    // 在线人数统计
    const loadOnlineStatistics = () => {
        onlineStatistics().then(res => {
            Object.assign(userStat, res)
        })
    }

    // 容器
    const loadDeviceStatistics1 = () => {
        deviceStatistics<any>({deviceType: 1}).then(res => {
            containers.length = 0
            let list = (res || [])
            list = list.map(item => ({key: item.statTime, value: item.total}))
            containers.push(...list)
        })
    }

    // 虚拟机
    const loadDeviceStatistics2 = () => {
        deviceStatistics<any>({deviceType: 2}).then(res => {
            vms.length = 0
            let list = (res || [])
            list = list.map(item => ({key: item.statTime, value: item.total}))
            vms.push(...list)
        })
    }

    // 交换机
    const loadDeviceStatistics3 = () => {
        deviceStatistics<any>({deviceType: 3}).then(res => {
            exchanges.length = 0
            let list = (res || [])
            list = list.map(item => ({key: item.statTime, value: item.total}))
            exchanges.push(...list)
        })
    }

    // 系统资源
    const loadSysResource = () => {
        sysResource().then(res => {
            Object.assign(sysResourceStat, res)
        })
    }

    // 单个实例资源
    const loadInstanceResource = () => {
        if (!selectInstanceOptions.value) {
            Object.assign(oneInstanceStat, {
                cpuPercentage: 0,
                diskPercentage: 0,
                memoryPercentage: 0,
            })
            return
        }
        instanceResource({instanceId: selectInstanceOptions.value.value})
            .then(({cpuPercentage, diskPercentage, memoryPercentage}) => {
                Object.assign(oneInstanceStat, {
                    cpuPercentage: parseFloat(cpuPercentage),
                    diskPercentage: parseFloat(diskPercentage),
                    memoryPercentage: parseFloat(memoryPercentage)
                })
            })
    }


    // 单个学员资源消耗
    const loadUserInstanceRank = () => {
        if (!selectStudentOptions.value) {
            Object.assign(oneStudentResourceStat, {
                cpuPercentage: "",
                cpuRankNo: 0,
                diskPercentage: "",
                diskRankNo: 0,
                instanceCnt: 0,
                instanceRankNo: 1,
                memoryPercentage: "",
                memoryRankNo: 0,
                user: {username: ''}
            })
            return
        }
        userInstanceRank({userId: selectStudentOptions.value.value})
            .then(res => {
                Object.assign(oneStudentResourceStat, res)
            })
    }

    const pageOneInit = ref(false)
    const pageTwoInit = ref(false)
    const loadData = (page?: number, force?: boolean) => {
        let pageOneLoad = true
        let pageTwoLoad = true
        if (page) {
            pageOneLoad = page === 1
            pageTwoLoad = page === 2
        }
        if (pageOneLoad) {
            if (force || !pageOneInit.value) {
                loadDataPageOne()
                pageOneInit.value = true
            }
        }
        if (pageTwoLoad) {
            if (force || !pageTwoInit.value) {
                loadDataPageTwo()
                pageTwoInit.value = true
            }
        }
    }

    return {
        selectCourseOptions,
        selectInstanceOptions,
        selectStudentOptions,
        coursePointPage,
        switchPage,
        loadData,
        coursePointList,
        taskTotal,
        taskTagList,
        courseTotal,
        courseAvgList,
        courseUnfinishedList,
        courseAvgStudentList,
        sceneTotal,
        sceneList,
        courses,
        courseAssignments,
        instances,
        students,
        instanceStat,
        userStat,
        containers,
        vms,
        exchanges,
        sysResourceStat,
        instanceTags,
        oneInstanceStat,
        oneStudentResourceStat,
        loadInstanceResource,
        loadUserInstanceRank,
        courseAssignmentSearchKey,
        loadCourseAssignmentPage,
        selectCourseAssignmentOptions,
        loadCoursePointPage
    }
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "data",
                storage: sessionStorage, //自定义存储位置
                paths: ['selectInstanceOptions', 'selectStudentOptions', 'courseAssignmentSearchKey', 'selectCourseAssignmentOptions']
            }
        ]
    }
})

export function useDataStoreHook() {
    return useDataStore(store);
}
