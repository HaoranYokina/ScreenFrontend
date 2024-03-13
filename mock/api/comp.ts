import Mocks from 'mockjs'

const baseUrl = '/match'

class Response {
    code = 0
    message = 'success'

    constructor(data) {
        this.data = data
    }

    data: {}

    static success(data) {
        return new Response(data)
    }
}

Mocks.mock(baseUrl + '/user/onlineStatistics', () => {
    return Response.success({
        total: 100,
        containerCnt: 12,
        judger: 0,
        judgerMaster: 1,
        currentUser: {
            realName: 'zdq'
        }
    })
})

Mocks.mock(baseUrl + '/summary', () => {
    return Response.success({
        isOpenFinal: true
    })
})

Mocks.mock(baseUrl + '/ranking/allData?page=1&pageSize=10000', () => {
    return Response.success({
        totalRank: [
            {group_name: '勇往直前队', total_score: 80, data_analyze_score: 10, group_total_ranking: 1},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 2},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 7},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 8},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 9},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 10},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 11},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 12},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 13},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 14},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 15},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 16},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 17},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 19},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 20},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 21},
            {group_name: '第d支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 22}
        ],
        ctfRank: [
            {group_name: '勇往直前队', total_score: 80, ctfScore: 22, group_total_ranking: 1},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 2},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 6},
            {group_name: '第e支队伍', total_score: 69, ctfScore: 12, group_total_ranking: 6},
        ],
        dataAnalyzeRank: [
            {group_name: '勇往直前队', total_score: 80, data_analyze_score: 18, group_total_ranking: 1},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 2},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 8},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 7},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 6},
            {group_name: '第f支队伍', total_score: 69, data_analyze_score: 12, group_total_ranking: 6},
        ],
    })
})

Mocks.mock(baseUrl + '/final/rankingAllData?page=1&pageSize=10000', () => {
    return Response.success({
        totalRank: [
            {group_name: '勇往直前队', total_score: 80, flagScore: 10, group_total_ranking: 1},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 2},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 7},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 8},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 9},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 10},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 11},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 12},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 13},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 14},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 15},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 16},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 17},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 18},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 19},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 20},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 20},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 21},
            {group_name: '第a支队伍', total_score: 69, flagScore: 12, group_total_ranking: 22},
        ],
        flagRank: [
            {group_name: '勇往直前队', total_score: 80, flagScore: 68, group_total_ranking: 1},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 2},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 7},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, flagScore: 12, group_total_ranking: 5},
            {group_name: '第b支队伍', total_score: 69, flagScore: 12, group_total_ranking: 6},
        ],
        bugfixRank: [
            {group_name: '勇往直前队', total_score: 80, bugfixScore: 56, group_total_ranking: 1},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 2},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 5},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 6},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 3},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 4},
            {group_name: '第一支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 5},
            {group_name: '第c支队伍', total_score: 69, bugfixScore: 12, group_total_ranking: 6},
        ]

    })
})

Mocks.mock(baseUrl + '/machine/list', () => {
    return Response.success([
        {"ip": "172.26.101.112", "name": "机器1", "usage": 1},
        {"ip": "172.26.101.113", "name": "机器2", "usage": 1},
        {"ip": "172.26.101.115", "name": "机器1", "usage": 2},
    ])
})

Mocks.mock(baseUrl + '/flag/page?page=1&pageSize=10', () => {
    return Response.success({
        list: [
            {finalGroups: {name: '勇往直前队'},score: 90,  submissions: {submitTime: '2023-11-03 12:00:00'},assignments:{name:'测试题目11'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 13:00:00'},assignments:{name:'测试题目22'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 11:00:00'},assignments:{name:'测试题目33'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 09:00:00'},assignments:{name:'测试题目11'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 22:00:00'},assignments:{name:'测试题目11'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 18:00:00'},assignments:{name:'测试题目11'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 13:00:00'},assignments:{name:'测试题目11'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 11:00:00'},assignments:{name:'测试题目11'}},
            {finalGroups: {name: '第二支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 09:00:00'},assignments:{name:'测试题目11'}},
            {finalGroups: {name: '最后支队伍'},score: 80,  submissions: {submitTime: '2023-11-03 18:00:00'},assignments:{name:'测试题目11'}},
        ]
    })
})

Mocks.mock(baseUrl + '/reclist?page=1&pageSize=1', () => {
    return Response.success({
        total: 3,
        offset: 1,
        reslist: []
    })
})


Mocks.mock(baseUrl + '/reclist?page=1&pageSize=10', () => {
    return Response.success({
        "total": 22,
        "offset": 1,
        "reslist": [
            {
                "testrec_id": 22,
                "testrec_status": 1,
                "testrec_time": "2023-11-02 15:45:05.278105",
                "showTime": "2023-11-02 15:45:05",
                "group_id": "83ce2cf9-4257-437c-90ae-22f44e919bb9",
                "testrec_model_name": "test.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 53,
                "testrec_status": 1,
                "testrec_time": "2023-11-04 19:29:43.356020",
                "showTime": "2023-11-04 19:29:43",
                "group_id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 58,
                "testrec_status": 1,
                "testrec_time": "2023-11-04 22:38:16.523977",
                "showTime": "2023-11-04 22:38:16",
                "group_id": "782f535b-1e31-4e9d-a168-863463927af1",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 74,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 02:41:10.836809",
                "showTime": "2023-11-05 02:41:10",
                "group_id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 78,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 09:32:58.985383",
                "showTime": "2023-11-05 09:32:58",
                "group_id": "4e7df288-89c1-4bfd-ab65-fa314f36ddfe",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "4e7df288-89c1-4bfd-ab65-fa314f36ddfe",
                    "name": "前端",
                    "createdAt": "2023-11-05 02:40:07",
                    "updatedAt": "2023-11-05 02:40:07"
                }
            },
            {
                "testrec_id": 88,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 13:27:35.633485",
                "showTime": "2023-11-05 13:27:35",
                "group_id": "6c1d470a-301f-404e-bed8-a4988e350126",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 93,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 14:52:29.538171",
                "showTime": "2023-11-05 14:52:29",
                "group_id": "32bb5c69-bf58-4259-9dc3-82d48e03680e",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 99,
                "testrec_status": 1,
                "testrec_time": "2023-11-06 04:40:04.887489",
                "showTime": "2023-11-06 04:40:04",
                "group_id": "5335c3b5-eda4-462f-9735-5229fd1f5f2a",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 103,
                "testrec_status": 1,
                "testrec_time": "2023-11-06 14:27:34.430829",
                "showTime": "2023-11-06 14:27:34",
                "group_id": "a67e8e7d-eac8-4a1c-bb74-1040a331f041",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
        ]
    })
})
Mocks.mock(baseUrl + '/reclist?page=2&pageSize=7', () => {
    return Response.success({
        "total": 22,
        "offset": 1,
        "reslist": [
            {
                "testrec_id": 22,
                "testrec_status": 1,
                "testrec_time": "2023-11-02 15:45:05.278105",
                "showTime": "2023-11-02 15:45:05",
                "group_id": "83ce2cf9-4257-437c-90ae-22f44e919bb9",
                "testrec_model_name": "test.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 53,
                "testrec_status": 1,
                "testrec_time": "2023-11-04 19:29:43.356020",
                "showTime": "2023-11-04 19:29:43",
                "group_id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 58,
                "testrec_status": 1,
                "testrec_time": "2023-11-04 22:38:16.523977",
                "showTime": "2023-11-04 22:38:16",
                "group_id": "782f535b-1e31-4e9d-a168-863463927af1",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 74,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 02:41:10.836809",
                "showTime": "2023-11-05 02:41:10",
                "group_id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 78,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 09:32:58.985383",
                "showTime": "2023-11-05 09:32:58",
                "group_id": "4e7df288-89c1-4bfd-ab65-fa314f36ddfe",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "4e7df288-89c1-4bfd-ab65-fa314f36ddfe",
                    "name": "前端",
                    "createdAt": "2023-11-05 02:40:07",
                    "updatedAt": "2023-11-05 02:40:07"
                }
            },
            {
                "testrec_id": 88,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 13:27:35.633485",
                "showTime": "2023-11-05 13:27:35",
                "group_id": "6c1d470a-301f-404e-bed8-a4988e350126",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 93,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 14:52:29.538171",
                "showTime": "2023-11-05 14:52:29",
                "group_id": "32bb5c69-bf58-4259-9dc3-82d48e03680e",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 99,
                "testrec_status": 1,
                "testrec_time": "2023-11-06 04:40:04.887489",
                "showTime": "2023-11-06 04:40:04",
                "group_id": "5335c3b5-eda4-462f-9735-5229fd1f5f2a",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 103,
                "testrec_status": 1,
                "testrec_time": "2023-11-06 14:27:34.430829",
                "showTime": "2023-11-06 14:27:34",
                "group_id": "a67e8e7d-eac8-4a1c-bb74-1040a331f041",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
        ]
    })
})
Mocks.mock(baseUrl + '/reclist?page=3&pageSize=7', () => {
    return Response.success({
        "total": 22,
        "offset": 1,
        "reslist": [
            {
                "testrec_id": 22,
                "testrec_status": 1,
                "testrec_time": "2023-11-02 15:45:05.278105",
                "showTime": "2023-11-02 15:45:05",
                "group_id": "83ce2cf9-4257-437c-90ae-22f44e919bb9",
                "testrec_model_name": "test.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 53,
                "testrec_status": 1,
                "testrec_time": "2023-11-04 19:29:43.356020",
                "showTime": "2023-11-04 19:29:43",
                "group_id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 58,
                "testrec_status": 1,
                "testrec_time": "2023-11-04 22:38:16.523977",
                "showTime": "2023-11-04 22:38:16",
                "group_id": "782f535b-1e31-4e9d-a168-863463927af1",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 74,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 02:41:10.836809",
                "showTime": "2023-11-05 02:41:10",
                "group_id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 78,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 09:32:58.985383",
                "showTime": "2023-11-05 09:32:58",
                "group_id": "4e7df288-89c1-4bfd-ab65-fa314f36ddfe",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "4e7df288-89c1-4bfd-ab65-fa314f36ddfe",
                    "name": "前端",
                    "createdAt": "2023-11-05 02:40:07",
                    "updatedAt": "2023-11-05 02:40:07"
                }
            },
            {
                "testrec_id": 88,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 13:27:35.633485",
                "showTime": "2023-11-05 13:27:35",
                "group_id": "6c1d470a-301f-404e-bed8-a4988e350126",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 93,
                "testrec_status": 1,
                "testrec_time": "2023-11-05 14:52:29.538171",
                "showTime": "2023-11-05 14:52:29",
                "group_id": "32bb5c69-bf58-4259-9dc3-82d48e03680e",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 99,
                "testrec_status": 1,
                "testrec_time": "2023-11-06 04:40:04.887489",
                "showTime": "2023-11-06 04:40:04",
                "group_id": "5335c3b5-eda4-462f-9735-5229fd1f5f2a",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
            {
                "testrec_id": 103,
                "testrec_status": 1,
                "testrec_time": "2023-11-06 14:27:34.430829",
                "showTime": "2023-11-06 14:27:34",
                "group_id": "a67e8e7d-eac8-4a1c-bb74-1040a331f041",
                "testrec_model_name": "groundtruth.csv",
                "f1score": 1,
                "accuracy": 1,
                "precision": 1,
                "Recall": 1,
                "finalGroups": {
                    "id": "c9a518b9-e045-401d-889e-d1c55f0a59ab",
                    "name": "后端",
                    "createdAt": "2023-11-05 02:40:05",
                    "updatedAt": "2023-11-05 02:40:05"
                }
            },
        ]
    })
})

Mocks.mock(baseUrl + '/machine/metrics?ip=172.26.101.112', () => {
    return Response.success([
        {
            "statTime": "10:00",
            "cpuPercentage": 12.2,
            "memoryPercentage": 25.7,
            "bandwidth": 12.7
        },
        {
            "statTime": "12:00",
            "cpuPercentage": 22.2,
            "memoryPercentage": 35.7,
            "bandwidth": 52.7
        },
        {
            "statTime": "13:00",
            "cpuPercentage": 22.2,
            "memoryPercentage": 65.7,
            "bandwidth": 22.7
        },
        {
            "statTime": "14:00",
            "cpuPercentage": 72.2,
            "memoryPercentage": 85.7,
            "bandwidth": 22.7
        },
        {
            "statTime": "15:00",
            "cpuPercentage": 2.2,
            "memoryPercentage": 16.7,
            "bandwidth": 28.7
        },
    ])
})

Mocks.mock(baseUrl + '/machine/metrics?ip=172.26.101.113', () => {
    return Response.success([
        {
            "statTime": "10:00",
            "cpuPercentage": 82.2,
            "memoryPercentage": 15.7,
            "bandwidth": 16.7
        },
        {
            "statTime": "12:00",
            "cpuPercentage": 69.2,
            "memoryPercentage": 25.7,
            "bandwidth": 52.7
        },
        {
            "statTime": "13:00",
            "cpuPercentage": 32.2,
            "memoryPercentage": 65.7,
            "bandwidth": 12.7
        },
        {
            "statTime": "14:00",
            "cpuPercentage": 82.2,
            "memoryPercentage": 85.7,
            "bandwidth": 22.7
        },
        {
            "statTime": "15:00",
            "cpuPercentage": 6.2,
            "memoryPercentage": 18.7,
            "bandwidth": 22.7
        },
    ])
})

Mocks.mock(baseUrl + '/machine/metrics?ip=172.26.101.115', () => {
    return Response.success([
        {
            "statTime": "10:00",
            "cpuPercentage": 52.2,
            "memoryPercentage": 25.7,
            "bandwidth": 18.7
        },
        {
            "statTime": "12:00",
            "cpuPercentage": 69.2,
            "memoryPercentage": 25.7,
            "bandwidth": 52.7
        },
        {
            "statTime": "13:00",
            "cpuPercentage": 32.2,
            "memoryPercentage": 65.7,
            "bandwidth": 22.7
        },
        {
            "statTime": "14:00",
            "cpuPercentage": 82.2,
            "memoryPercentage": 85.7,
            "bandwidth": 29.7
        },
        {
            "statTime": "15:00",
            "cpuPercentage": 16.2,
            "memoryPercentage": 18.7,
            "bandwidth": 22.7
        },
    ])
})

Mocks.mock(baseUrl + '/machine/singleMetrics?ip=172.26.101.112', () => {
    return Response.success({
        "statTime": "10:00",
        "cpuPercentage": 60.2,
        "memoryPercentage": 15.2,
        "bandwidth": 198.1
    })
})

Mocks.mock(baseUrl + '/machine/singleMetrics?ip=172.26.101.113', () => {
    return Response.success({
        "statTime": "10:00",
        "cpuPercentage": 22.2,
        "memoryPercentage": 19.7,
        "bandwidth": 1002.2
    })
})

Mocks.mock(baseUrl + '/machine/singleMetrics?ip=172.26.101.115', () => {
    return Response.success({
        "statTime": "10:00",
        "cpuPercentage": 22.2,
        "memoryPercentage": 25.7,
        "bandwidth": 121.12
    })
})

Mocks.mock(baseUrl + '/final/allBugfixOrFlag', () => {
    return Response.success([
        {
            "bugType": 1,
            "name": 'SQL注入',
            "id": 1,
        },
        {
            "bugType": 2,
            "name": '脚本注入',
            "id": 1,
        },

        {
            "bugType": 1,
            "name": 'ROOT防护',
            "id": 1,
        },
    ])
})


Mocks.mock(baseUrl + '/final/allBugfixOrFlagDetail?id=1&bugType=1&pageSize=6', () => {
    return Response.success({
        "flag": {
            "id": "818ec3df-6460-42dd-89d1-e78180935c8a",
            "flag": "a",
            "name": "决赛flag1",
            "desc": "xxx",
            "createdAt": "2023-11-03 05:36:11",
            "updatedAt": "2023-11-03 05:36:11"
        },
        "bugfix": null,
        "list": [
            {
                "flagSubmissions": {
                    "id": "ba1f42a5-dda4-4a37-bdf5-4e3f52119bff",
                    "isCorrect": true,
                    "submitTime": "2023-11-03 06:13:53",
                    "submittedGroupId": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "submittedUserId": "9d344da7-d51c-425b-9857-2ce4a5d98c1d",
                    "finalFlagAssignmentId": "818ec3df-6460-42dd-89d1-e78180935c8a",
                    "createdAt": "2023-11-03 06:13:53",
                    "updatedAt": "2023-11-03 06:13:53"
                },
                "bugfixSubmissions": null,
                "finalGroups": {
                    "id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "name": "后端",
                    "createdAt": "2023-11-03 05:35:56",
                    "updatedAt": "2023-11-03 05:35:56"
                }
            }
        ]
    })
})

Mocks.mock(baseUrl + '/user/loginByPwd', () => {
    return Response.success({
        "userinfo": {
            "id": "de224a63-596a-4a23-ab11-b6d27f389b59",
            "username": "zxc",
            "password": "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413",
            "realName": "张Sir",
            "phone": "66666666666",
            "school": "清华大学",
            "isLeader": false,
            "lastLoginTime": "2023-11-06 20:07:02",
            "lastInstanceOpTime": "1970-01-01 08:00:00",
            "userGroup": "judger_master",
            "groupId": null,
            "createdAt": "2023-11-05 02:40:09",
            "updatedAt": "2023-11-05 02:40:09"
        },
        remoteUser: {
            cyber_range_sid: 'AT:1231312312123123'
        }
    })
})

Mocks.mock(baseUrl + '/final/allBugfixOrFlagDetail?id=1&bugType=2&pageSize=6', () => {
    return Response.success({
        "flag": null,
        "bugfix": {
            "id": "d301691d-0183-4d7b-a344-d45f8a358d88",
            "website": "Bing",
            "path": "./internal_storage/bugfix/bing",
            "desc": "",
            "detailInfo": null,
            "createdAt": "2023-11-03 05:36:14",
            "updatedAt": "2023-11-03 05:36:14"
        },
        "list": [
            {
                "flagSubmissions": null,
                "bugfixSubmissions": {
                    "id": "47dac352-5af5-4199-a7f4-e77dba37244e",
                    "isCorrect": true,
                    "isJudging": false,
                    "judgeMsg": "评测正确",
                    "submitTime": "2023-11-03 06:12:24",
                    "submittedGroupId": "782f535b-1e31-4e9d-a168-863463927af1",
                    "submittedUserId": "d9089d44-2d8a-4181-a1c2-309b6571a118",
                    "finalBugfixAssignmentId": "d301691d-0183-4d7b-a344-d45f8a358d88",
                    "submitFileName": "图片1.png",
                    "submitFileUrl": "internal_storage/tmp/bugfix_file/92aabd07-d112-492e-9a9a-f5967bbd8cba.png",
                    "createdAt": "2023-11-03 06:12:24",
                    "updatedAt": "2023-11-03 06:12:34"
                },
                "finalGroups": {
                    "id": "782f535b-1e31-4e9d-a168-863463927af1",
                    "name": "前端",
                    "createdAt": "2023-11-03 05:35:59",
                    "updatedAt": "2023-11-03 05:35:59"
                }
            },
            {
                "flagSubmissions": null,
                "bugfixSubmissions": {
                    "id": "8b517827-94c3-40aa-85ed-131f2beb1034",
                    "isCorrect": true,
                    "isJudging": false,
                    "judgeMsg": "评测正确",
                    "submitTime": "2023-11-03 06:08:09",
                    "submittedGroupId": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "submittedUserId": "9d344da7-d51c-425b-9857-2ce4a5d98c1d",
                    "finalBugfixAssignmentId": "d301691d-0183-4d7b-a344-d45f8a358d88",
                    "submitFileName": "图片1.png",
                    "submitFileUrl": "internal_storage/tmp/bugfix_file/c94ec2b6-dcfd-41ee-a364-05b329259677.png",
                    "createdAt": "2023-11-03 05:37:46",
                    "updatedAt": "2023-11-03 06:08:22"
                },
                "finalGroups": {
                    "id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "name": "后端",
                    "createdAt": "2023-11-03 05:35:56",
                    "updatedAt": "2023-11-03 05:35:56"
                }
            },
            {
                "flagSubmissions": null,
                "bugfixSubmissions": {
                    "id": "8b517827-94c3-40aa-85ed-131f2beb1034",
                    "isCorrect": true,
                    "isJudging": false,
                    "judgeMsg": "评测正确",
                    "submitTime": "2023-11-03 06:08:09",
                    "submittedGroupId": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "submittedUserId": "9d344da7-d51c-425b-9857-2ce4a5d98c1d",
                    "finalBugfixAssignmentId": "d301691d-0183-4d7b-a344-d45f8a358d88",
                    "submitFileName": "图片1.png",
                    "submitFileUrl": "internal_storage/tmp/bugfix_file/c94ec2b6-dcfd-41ee-a364-05b329259677.png",
                    "createdAt": "2023-11-03 05:37:46",
                    "updatedAt": "2023-11-03 06:08:22"
                },
                "finalGroups": {
                    "id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "name": "后端",
                    "createdAt": "2023-11-03 05:35:56",
                    "updatedAt": "2023-11-03 05:35:56"
                }
            },
            {
                "flagSubmissions": null,
                "bugfixSubmissions": {
                    "id": "8b517827-94c3-40aa-85ed-131f2beb1034",
                    "isCorrect": true,
                    "isJudging": false,
                    "judgeMsg": "评测正确",
                    "submitTime": "2023-11-03 06:08:09",
                    "submittedGroupId": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "submittedUserId": "9d344da7-d51c-425b-9857-2ce4a5d98c1d",
                    "finalBugfixAssignmentId": "d301691d-0183-4d7b-a344-d45f8a358d88",
                    "submitFileName": "图片1.png",
                    "submitFileUrl": "internal_storage/tmp/bugfix_file/c94ec2b6-dcfd-41ee-a364-05b329259677.png",
                    "createdAt": "2023-11-03 05:37:46",
                    "updatedAt": "2023-11-03 06:08:22"
                },
                "finalGroups": {
                    "id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "name": "后端",
                    "createdAt": "2023-11-03 05:35:56",
                    "updatedAt": "2023-11-03 05:35:56"
                }
            },
            {
                "flagSubmissions": null,
                "bugfixSubmissions": {
                    "id": "8b517827-94c3-40aa-85ed-131f2beb1034",
                    "isCorrect": true,
                    "isJudging": false,
                    "judgeMsg": "评测正确",
                    "submitTime": "2023-11-03 06:08:09",
                    "submittedGroupId": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "submittedUserId": "9d344da7-d51c-425b-9857-2ce4a5d98c1d",
                    "finalBugfixAssignmentId": "d301691d-0183-4d7b-a344-d45f8a358d88",
                    "submitFileName": "图片1.png",
                    "submitFileUrl": "internal_storage/tmp/bugfix_file/c94ec2b6-dcfd-41ee-a364-05b329259677.png",
                    "createdAt": "2023-11-03 05:37:46",
                    "updatedAt": "2023-11-03 06:08:22"
                },
                "finalGroups": {
                    "id": "5bdc62ea-5f31-4a7e-9c60-75c0ff7182e2",
                    "name": "后端",
                    "createdAt": "2023-11-03 05:35:56",
                    "updatedAt": "2023-11-03 05:35:56"
                }
            }
        ]
    })
})

