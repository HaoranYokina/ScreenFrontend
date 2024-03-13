import * as process from "process"
import {v4 as uuidv4} from 'uuid'

interface CommonUtil {
    isDev(): boolean

    isTest(): boolean

    isProd(): boolean

    uuid(): string

    uuidStr(): string

    /**
     * 扫描二维码
     * @param localCode 本地开发环境可以指定固定的码
     */
    scanQRCode<T>(localCode?: T): Promise<T>

    requireImg(imgPath: string)

    getExpirationDay(dateStr: string | Date): number

    countHtmlFontSize(designWidth: number): string
}

class CommonUtilImpl implements CommonUtil {

    countHtmlFontSize(designWidth: number): string {
        // (100/设计稿尺寸）*100 =html font-size+vw
        return (100 / designWidth) * 100 + 'vw'
    }

    isDev(): boolean {

        return process.env.NODE_ENV === 'development'
    }

    isTest(): boolean {
        return process.env.NODE_ENV === 'test'
    }

    isProd(): boolean {
        return process.env.NODE_ENV === 'production'
    }

    uuid(): string {
        return uuidv4()
    }

    uuidStr(): string {
        return uuidv4().replaceAll('-', '')
    }

    scanQRCode<T>(localCode?: T): Promise<T> {
        return new Promise((resolve, reject) => {
            if (this.isDev() && localCode) {
                resolve(localCode)
                return
            }
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    //showToast(result)
                    resolve(result.split(',')[1])
                },
                error: function (err) {
                    reject(err)
                }
            })
        })
    }

    requireImg(imgPath: string) {
        try {
            const handlePath = imgPath.replace('@', '..');
            // https://vitejs.cn/guide/assets.html#the-public-directory
            return new URL(handlePath, import.meta.url).href;
        } catch (error) {
            console.warn(error);
        }
    }

    getExpirationDay(dateStr: string | Date): number {
        let expireDate
        if (typeof dateStr === 'string') {
            // 将办卡时间字符串转换为日期对象
            expireDate = new Date(dateStr?.replaceAll('-', '/'));
        } else {
            expireDate = dateStr
        }
        // 获取当前日期
        let today = new Date();
        // 计算会员卡到期天数
        let timeDiff = expireDate.getTime() - today.getTime();
        let daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysLeft
    }

}

export default new CommonUtilImpl()
