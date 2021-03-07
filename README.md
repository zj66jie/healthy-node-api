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
cnpm install koa2-request --save
cnpm install log4js --save
cnpm install @koa/multer --save
cnpm install log4js --save
cnpm install koa-static --save
```

### 运行
修改package.json 中的test值，为"nodemon mySqlServe.js"，其中nodemon为nodemon组件，后面跟上main后的路径文件

 ipv6地址http://[2409:8a44:b18:b6b0:fd35:e731:fdda:eade]:3000/test

### 中间件

中间件 next(),执行到 next()的时候，跳过当前代码，执行下一个 app.use
### 上传文件时，需要在upload手动设置路径