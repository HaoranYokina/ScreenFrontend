import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from "path";

const root: string = process.cwd();
const pathResolve = (dir: string): string => {
    return resolve(__dirname, ".", dir);
};

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // 检查process.cwd()路径下.env.develeport.local、.env.development、.env.local、.env这四个环境文件
    const env = loadEnv(mode, root);
    return {

        // 静态资源基础路径 base: './' || '',
        base: env.VITE_ASSETS_BASH || '',

        resolve: {
            alias: {
                // 配置src目录
                "@": pathResolve("src"),
                // 导入其他目录
                "components": pathResolve("components")
            }
        },
        plugins: [
            vue(),
        ],
        css:{
            preprocessorOptions:{
                scss:{
                    additionalData: '@import "@/assets/scss/index.scss";',
                }
            }
        },

        // 跨域代理
        server: {
            host: '0.0.0.0',
            port:9999,
           /* proxy: {
                '/api': {
                    target: 'https://api.inews.qq.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '') // 将匹配到的api替换成''
                }
            }*/
        }
    };
});
