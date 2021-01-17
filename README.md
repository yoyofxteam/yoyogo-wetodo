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