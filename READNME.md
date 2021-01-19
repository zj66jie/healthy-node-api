### 安装的
```node
cnpm init
cnpm install nodemon --save
cnpm install koa --save
cnpm install koa-json --save
cnpm install koa-router --save
cnpm install mysql --save
cnpm install koa-bodyparser --save
cnpm install koa-core --save
```
### 运行
修改package.json 中的test值，为"nodemon mySqlServe.js"，其中nodemon为nodemon组件，后面跟上main后的路径文件

### 中间件

中间件 next(),执行到 next()的时候，跳过当前代码，执行下一个 app.use
