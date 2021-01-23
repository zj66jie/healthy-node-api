// index.js
const Koa = require("koa");
const json = require("koa-json"); //引入koa-json，只是将数据显示好看点
const bodyParser = require("koa-bodyparser"); //引入post 中间件用来处理post请求
const router = require("koa-router")(); //路由: ()直接实例化
const cors = require("koa-cors");
// const koa2Req = require('koa2-request');

const config = require("./config");
const mysql = require("./mysql");
const app = new Koa();

app.use(json());
app.use(cors());
app.use(bodyParser()); //引入post 中间件用来处理post请求
app.use(router.routes()); //启动路由
app.use(router.allowedMethods()); //接收get

//启动路由获取
const fontApi = require("./front-end/fontApi");
fontApi.frontApi(router);
// 未上报数据获取
router.get("/pay-info", async (ctx, next) => {
  let data = await mysql.select("pay_info");
  // console.log(err);
  ctx.body = {
    code: 1,
    data: data,
    mesg: "ok",
  };
});

router.get("/pay-delect", async (ctx, next) => {
  let data = await mysql.payDelete();
  // console.log(err);
  ctx.body = {
    code: 1,
    mesg: "ok",
  };
});

//路由接口请求方式.获取的是前端传递过来的值后端接受时的数据形式
router.get("/", async (ctx, next) => {
  // let url = ctx.url;

  //从request中获取GET请求
  let request = ctx.request; //获取前端请求
  let req_query = request.query; //query：返回的是格式化好的参数对象。
  let req_querystring = request.querystring; //返回的是请求字符串。
  //从上下文中直接获取（和上面的结果一样）
  // 和request中获取GET请求区别是更直接， ctx.request 里面包含很多，包括了query
  let ctx_query = ctx.query;
  // console.log(ctx.url);   //获取url地址
  // let ctx_querystring = (ctx.query_querystring = ctx.querystring);
  // console.log(ctx);
  // 返还的前端数据
  ctx.body = {
    title: "koa2 json",
    req_query,
    req_querystring,
    ctx_query,
  };
});

//post 请求 并转换为json数据
router.get("/post", async (ctx, next) => {
  let html = `
            <h1>JSPang Koa2 request POST</h1>
            <form method="POST" action="/post">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /><br/>
                <p>website</p>
                <input name="webSite" /><br/>
                <button type="submit">submit</button>
            </form>
        `;
  ctx.body = html;
});
router.post("/post", async (ctx, next) => {
  let postData = ctx.request.body; // ctx.request.body 调用中间件bodyParser，获取post 提交的数据
  let { userName } = ctx.request.body;
  ctx.body = {
    code: 1,
    data: postData,
    mesg: "postData",
    name: userName,
  };
});
//默认获取
// app.use(async (ctx) => {
//   let data = await mysql.query("name");
//   console.log(data + "fff13");
//   // 判断数据是否为空
//   if (data.length === 0 || data == null) {
//     console.log(333);
//   }
//   ctx.body = {
//     code: 1,
//     data: data,
//     mesg: "ok",
//   };
// });

app.listen(config.port); //localhost:config.port

console.log(`listening on port ${config.port}`);
