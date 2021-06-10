## 简介

承兑商后台管理系统

### 域名

测试域名：http://tapi.whkuaiyu.com

正式域名：http://admin.t-rex.world

### 登录账号

123456 123456

### 测试服务器地址

测试服：54.222.167.84

测试访问：http://tapi.whkuaiyu.com/pvuser

正式服：94.74.88.59

正式访问：http://admin.t-rex.world/pvuser

### 接口文档

[测试接口文档] http://tapi.whkuaiyu.com/provider/swagger-ui.html#/

[正式接口文档]

## 命令

```bash
# 启动
npm run serve 或 yarn serve

# 打包
npm run build:环境名 或 yarn build:环境名

# 静态资源分析
npm run report 或 yarn report

# 代码格式检查并自动修复
npm run lintcd
├── public                     // html模板
├── src                        // 源代码
│   ├── api                    // 各模块请求接口函数
│   ├── assets                 // 图片、icons、styles等静态资源
│   ├── components             // 全局公共组件
│   ├── directive              // 公共自定义指令
│   ├── filters                // 公共filter
│   │   ├── transform.js       // 字段转中文函数
│   ├── utils                  // 公用方法目录
│   │   ├── request.js         // axios请求统一配置
│   │   ├── routerGuards.js    // 全局路由拦截
│   │   ├── tools.js           // 公共工具方法
│   │   ├── storage.js         // localStorage存储封装
│   │   ├── validate.js        // 公共表单校验方法
│   ├── views                  // 所有页面代码目录
├── vue.config.js              // vue-cli配置
```

### 去中心化

### 共享表单验证方法(搭配 vuex 来实现)

## 浏览器支持

IE 11
Edge
Chrome
Firefox
Safari

## git 代码提交规范

git add .
git commit -m 'type: 说明'

type 详情看 'commitline.config.js' 文件

## 注意：只能在 6.0 版本之前使用 husky 不生效请看版本是否在 6.0 版本之前
