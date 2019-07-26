# no-afraid-go-web

### 介绍

no-afraid-go-web

### 软件架构

TypeScript+Koa2+MongooseDB

### 使用说明

首先要先将根目录下的`.env.example`复制出来（不要删除），然后去除`.example`后缀名，变成`.env`。配置.env 下的自己 `MONGODB_URI_LOCAL` 也即是本地 MongoDb 的地址

#### 安装包

安装包`npm i`

#### 启动

开发环境下可以使用`npm start`或者使用 vscode 按`F5`调试模式执行，推荐使用 vscdoe 调试

#### 部署

主要使用 pm2 来多进程管理和部署环境，使用命令`pm2 deploy`，即可打包发布。其他命令和配置请参考 pm2 文档

### 目录结构

- api 存放 api 接口

- config 存放一些配置

- const 常量存放

- controllers 控制层

- interfaces 自定义接口

- middleware 中间间

- models 模型层

- types 扩展模块接口

- utils 工具

- server.ts 入口文件
