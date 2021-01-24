# Install this React App

## 淘宝源
```
npm conf set registry https://registry.npm.taobao.org

```
## Install
```
npm install
```
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


## Docker
### 构建镜像
```
docker build -t wetodo-container .

```

### 启动容器
```
docker run -p 8092:8092 -d --name webtodo wetodo-container
```

## 计划
1. 目前item id,使用的是数组的下标，改进方案，是生成惟一ID(分布式环境下也是惟一)及后端生成.
2. 添加删除功能,依赖于item id. H5端的数据结构可能需要修改，数组不能并发.
3. 每个item独立更新,包括状态和内容.
4. 用户功能，多用户登录，item中添加 by user_id.