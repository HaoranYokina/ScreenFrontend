import {defineStore} from "pinia";
import {store} from "@/store";
import {reactive, ref} from "vue";
import {allBugfixOrFlag, allRanking, compInfo, finalRankingAll, machineList, onlineStatistics} from "@/api/compData";
import {useCompSettingStoreHook} from "@/store/modules/compSetting";


const useCompDataStore = defineStore('comp', () => {


    const refreshCount = ref(0)
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

    const onlineInfo = ref({})
    const loadUserInfo = () => {
        onlineStatistics().then(res => {
            onlineInfo.value = res
        })
    }

    let timer1, timeStep = 5000
    timer1 = setInterval(() => {
        loadUserInfo()
    }, timeStep)

    const totalLeaderboard = reactive([])
    const cftLeaderboard = reactive([])
    const dataAnalysisLeaderboard = reactive([])
    const finalTotalLeaderboard = reactive([])
    const finalFlagLeaderboard = reactive([])
    const finalBugLeaderboard = reactive([])
    const flagScoreList = reactive([])

    const loadDataPageOne = () => {
        loadCompInfo()
        loadUserInfo()
        loadMachineList(false)
        //loadRankingAll()
    }


    const loadDataPageTwo = () => {
        loadCompInfo()
        loadUserInfo()
        loadMachineList(true)
        loadAllBugfixOrFlag()
        //loadFinalRankingAll()
    }


    const allBugfixFlagList = reactive([])
    const loadAllBugfixOrFlag = () => {
        allBugfixOrFlag<any>().then(list => {
            allBugfixFlagList.length = 0
            list = (list || [])
            allBugfixFlagList.push(...list)
        })
    }

    const loadCompInfo = () => {
        compInfo().then(({isOpenFinal}) => {
            useCompSettingStoreHook().setHasPageTwo(isOpenFinal)
        })
    }
    const compMachineList1 = reactive([])
    const compMachineList2 = reactive([])
    const loadMachineList = (isFinalComp: boolean) => {
        machineList<any>().then(res => {
            let list = res || []
            if (isFinalComp) {
                compMachineList2.push(...list.filter(item => item.usage === 2))
            } else {
                //机器用途 1是初赛 2是决赛
                compMachineList1.push(...list.filter(item => item.usage === 1))
            }
        })
    }

    const loadTotalRanking = () => {
        return new Promise((resolve, reject) => {
            allRanking<any>(1, 10000).then(({totalRank, ctfRank, dataAnalyzeRank}) => {
                totalRank = totalRank || []
                totalRank = totalRank.map((item, i) => ({
                    groupName: item.group_name,
                    score: item.total_score,
                    rank: i + 1,
                    ranking: item.group_total_ranking,
                }))
                resolve(totalRank)
            }).catch(err => {
                reject(err)
            })
        })
    }
    const loadCftRanking = () => {
        return new Promise((resolve, reject) => {
            allRanking<any>(1, 10000).then(({totalRank, ctfRank, dataAnalyzeRank}) => {
                ctfRank = ctfRank || []
                ctfRank = ctfRank.map((item, i) => ({
                    groupName: item.group_name,
                    score: item.ctfScore,
                    ranking: item.group_total_ranking,
                    id: item.id
                }))
                resolve(ctfRank)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const loadDataAnalyzeRank = () => {
        return new Promise((resolve, reject) => {
            allRanking<any>(1, 10000).then(({totalRank, ctfRank, dataAnalyzeRank}) => {
                dataAnalyzeRank = dataAnalyzeRank || []
                dataAnalyzeRank = dataAnalyzeRank.map((item, i) => ({
                    groupName: item.group_name,
                    score: item.data_analyze_score,
                    ranking: item.group_total_ranking,
                    id: item.id,
                }))
                resolve(dataAnalyzeRank)
            }).catch(err => {
                reject(err)
            })
        })
    }

    const loadRankingAll = () => {
        //初赛：排行 totalRank 总分、ctfRank CTF题、dataAnalyzeRank 数据分析
        allRanking<any>(1, 10000).then(({totalRank, ctfRank, dataAnalyzeRank}) => {
            totalRank = totalRank || []
            ctfRank = ctfRank || []
            dataAnalyzeRank = dataAnalyzeRank || []
            totalRank = totalRank.map((item, i) => ({
                groupName: item.group_name,
                score: item.total_score,
                ranking: item.group_total_ranking,
            }))

            ctfRank = ctfRank.map((item, i) => ({
                groupName: item.group_name,
                score: item.ctfScore,
                ranking: item.group_total_ranking,
                id: item.id
            }))

            dataAnalyzeRank = dataAnalyzeRank.map((item, i) => ({
                groupName: item.group_name,
                score: item.data_analyze_score,
                ranking: item.group_total_ranking,
                id: item.id,
            }))

            totalLeaderboard.length = 0
            totalLeaderboard.push(...totalRank)
            cftLeaderboard.length = 0
            cftLeaderboard.push(...ctfRank)
            dataAnalysisLeaderboard.length = 0
            dataAnalysisLeaderboard.push(...dataAnalyzeRank)
        })
    }

    const loadFinalRankingAll = () => {
        finalRankingAll<any>(1, 10000).then(({totalRank, flagRank, bugfixRank}) => {
            totalRank = totalRank || []
            flagRank = flagRank || []
            bugfixRank = bugfixRank || []
            totalRank = totalRank.map((item, i) => ({
                groupName: item.group_name,
                score: item.total_score,
                ranking: item.group_total_ranking
            }))
            flagRank = flagRank.map((item, i) => ({
                groupName: item.group_name,
                score: item.flagScore,
                ranking: item.group_total_ranking,
                id: item.id
            }))
            bugfixRank = bugfixRank.map((item, i) => ({
                groupName: item.group_name,
                score: item.bugfixScore,
                ranking: item.group_total_ranking,
                id: item.id
            }))
            finalTotalLeaderboard.length = 0
            finalTotalLeaderboard.push(...totalRank)
            finalFlagLeaderboard.length = 0
            finalFlagLeaderboard.push(...flagRank)
            finalBugLeaderboard.length = 0
            finalBugLeaderboard.push(...bugfixRank)
        })
    }

    const loadFinalTotalRanking = () => {
        return new Promise((resolve, reject) => {
            finalRankingAll<any>(1, 10000).then(({totalRank, flagRank, bugfixRank}) => {
                totalRank = totalRank || []
                totalRank = totalRank.map((item, i) => ({
                    groupName: item.group_name,
                    score: item.total_score,
                    ranking: item.group_total_ranking
                }))

                resolve(totalRank)
            }).catch(err=>reject(err))
        })
    }
    const loadFinalFlagRanking = () => {
        return new Promise((resolve, reject) => {
            finalRankingAll<any>(1, 10000).then(({totalRank, flagRank, bugfixRank}) => {
                flagRank = flagRank || []
                flagRank = flagRank.map((item, i) => ({
                    groupName: item.group_name,
                    score: item.flagScore,
                    ranking: item.group_total_ranking,
                    id: item.id
                }))

                resolve(flagRank)
            }).catch(err=>reject(err))
        })
    }
    const loadFinalBugfixRanking = () => {
        return new Promise((resolve, reject) => {
            finalRankingAll<any>(1, 10000).then(({totalRank, flagRank, bugfixRank}) => {
                bugfixRank = bugfixRank || []
                bugfixRank = bugfixRank.map((item, i) => ({
                    groupName: item.group_name,
                    score: item.bugfixScore,
                    ranking: item.group_total_ranking,
                    id: item.id
                }))
                resolve(bugfixRank)
            }).catch(err=>reject(err))
        })
    }


    const addRefreshCount = () => {
        refreshCount.value += 1
    }

    const totalSubmitGroupCnt = ref(0)
    const totalFinalSubmitGroupCnt = ref(0)

    return {
        loadData,
        addRefreshCount,
        loadTotalRanking,
        loadCftRanking,
        loadDataAnalyzeRank,
        loadFinalTotalRanking,
        loadFinalFlagRanking,
        loadFinalBugfixRanking,
        totalSubmitGroupCnt,
        totalFinalSubmitGroupCnt,
        onlineInfo,
        flagScoreList,
        totalLeaderboard,
        cftLeaderboard,
        dataAnalysisLeaderboard,
        finalTotalLeaderboard,
        finalFlagLeaderboard,
        finalBugLeaderboard,
        compMachineList1,
        compMachineList2,
        allBugfixFlagList,
        refreshCount,
    }
}, {
    persist: {
        enabled: true,
        strategies: [
            {
                key: "data",
                storage: sessionStorage, //自定义存储位置
                paths: []
            }
        ]
    }
})

export function useCompDataStoreHook() {
    return useCompDataStore(store);
}
