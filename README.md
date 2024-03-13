
## 大屏数据可视化前端项目


### Node 版本要求

`Vite` 需要 Node.js 12.0.0 或更高版本 (推荐 14.0.0+)。你可以使用 [nvm](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnvm-sh%2Fnvm "https://github.com/nvm-sh/nvm") 或 [nvm-windows](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows "https://github.com/coreybutler/nvm-windows") 在同一台电脑中管理多个 Node 版本。

本示例 Node.js 14.18.1

### 技术栈
- vue3
- pinia
- ts
- vue-router
- axios

### 本地开发启动项目

```
npm i 或 yarn

npm start 或 yarn start
```

### 编译
```shell
正式环境
npm run build 

测试环境
npm run build:test

开发环境
npm run build:dev
```

### 发布
将编译好的dist目录上传到服务器，使用web服务器（nginx）运行即可

### 部署细节（nginx示例）

- 配置Nginx：首先，确保您已经正确安装和配置了Nginx服务器。可以在Nginx的配置文件（通常是nginx.conf）中进行配置。找到位于http块内的server块，然后修改其中的配置。

- 设置静态资源路径：在Nginx的配置文件中，您需要指定Vue项目的静态资源路径。可以通过在server块中添加以下配置来实现：

```shell
location / {
    root /path/to/your/dist;   # 指定dist文件夹的路径
    try_files $uri $uri/ /index.ts.html;    # 尝试匹配URI，如果不存在则重定向到index.html
}
```
`请将/path/to/your/dist替换为您实际的dist文件夹路径。`

添加其他配置：根据您的需求，您还可以添加其他Nginx配置，例如设置HTTP访问控制、域名绑定等。可以根据项目的具体要求进行配置。
保存并重新启动Nginx：在完成配置后，保存Nginx配置文件，并通过使用命令行或服务管理工具重新启动Nginx服务器。
