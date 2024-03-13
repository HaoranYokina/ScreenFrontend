<template>
    <div class="container">
        <header>
            <span class="title">湖南网络攻防邀请赛</span>
        </header>
        <section>
            <el-input class="item" v-model.trim="userName" placeholder="请输入账户邮箱"/>
            <el-input class="item" v-model.trim="pwd" placeholder="请输入密码" type="password" show-password/>
            <el-button class="item" @click="login" :loading="isLogin">登 录</el-button>
            <div class="tip">
                比赛前端（裁判端） 公共测试版本
            </div>
        </section>
        <footer></footer>
    </div>
</template>

<script>
import 'element-plus/dist/index.css'
import {ElButton, ElInput, ElMessage} from 'element-plus'
import {loginByPwd} from "@/api/compData";
import {useUserStoreHook} from "@/store/modules/user";

export default {
    name: "login",
    components: {ElButton, ElInput},
    data() {
        return {
            userName: '',
            pwd: '',
            isLogin: false,
        }
    },
    mounted() {
        //console.log(this.$router.options.routes)
    },
    methods: {
        login() {
            let msg = ''
            if (!this.userName) {
                msg = '请输入登录账户'
            }
            if (!this.pwd) {
                msg = '请输入登录密码'
            }
            if (msg) {
                ElMessage({
                    message: msg,
                    type: 'warning',
                    showClose: true,
                    center: true,
                })
                return
            }
            this.isLogin = true
            loginByPwd(this.userName, this.pwd, {showMessage: false}).then(res => {
                if (!res.remoteUser) {
                    throw {message: '登录认证失败！'}
                }
                useUserStoreHook().setUid(res.userinfo.id)
                useUserStoreHook().setToken(res.remoteUser?.cyber_range_sid)
                let path = this.$route.query.redirect
                if (!path) {
                    path = '/data/visual3'
                }
                this.$router.push({path})
            }).catch(err => {
                ElMessage({
                    message: err.message,
                    type: 'error',
                    showClose: true,
                    center: true,
                })
                return
            }).finally(() => {
                this.isLogin = false
            })
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    position: relative;
    min-width: 400px;
    min-height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    padding: 5vw 0 3vw 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("@/assets/imgs/login/bg.jpg");

    header {
        position: absolute;
        top: 1vw;
        width: 100%;
        color: #ffffff;
        height: 3.5vw;
        font-size: 1.6vw;
        background-image: url("@/assets/imgs/login/bg1.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left;
        display: flex;
        justify-content: center;

        .title {
            margin-top: .1vw;
            font-family: "阿里妈妈数黑体";
        }
    }

    section {
        background: url("@/assets/imgs/login/bg3.png") no-repeat center / contain;
        width: 30vw;
        height: 22vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 3vw;

        :deep(.el-input__wrapper) {
            height: 3vw !important;
            border-radius: 1vw;
            font-size: .9vw;
            padding-left: 1vw;
            padding-right: 1vw;
        }

        :deep(.el-button) {
            height: 3vw !important;
            font-size: 1vw;
            padding: 0;
            background: linear-gradient(to bottom, #38d7fd, #0082c7);
            border-radius: 1vw;
            color: #ffffff;
            margin-top: 1vw;
        }

        div {
            display: flex;
            justify-content: center;
            font-size: .7vw;
            color: #20a4e9;
            color: #888888;

            &.tip {
                margin-top: .8vw;
            }
        }

        .item {
            margin-bottom: 1vw;
        }
    }

    footer {
        width: 100%;
        color: #ffffff;
        height: 2vw;
        position: absolute;
        bottom: 0;
        background-image: url("@/assets/imgs/login/bg2.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: left bottom;
        display: flex;
        justify-content: center;
    }
}
</style>
