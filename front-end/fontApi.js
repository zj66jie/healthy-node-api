class Api {
  constructor() {}
  frontApi(router) {
    const koa2Req = require("koa2-request");
    router.get("/te", async (ctx, next) => {
      ctx.body = {
        title: "koa2 test",
      };
    });
    // 获取小程序openid
    router.post("/get_openid", async (ctx, next) => {
      // const appId = "wx3b7a888e6739d8ce";
      // const AppSecret = "24de88e7255a895afb34e21ae50168a3";

      // console.log(ctx.request.body);
      // console.log(ctx.query);
      // console.log(request.query); post不能这样用
      const { code } = ctx.request.body;
      console.log("接收到jscode:", code);
      // const urls = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`;
      // console.log(urls);
      const res = await koa2Req({
        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`,
      });
      const bodys = JSON.parse(res.body);
      const session_key = bodys.session_key;
      const openid = bodys.openid;
      console.log("返回的session_key", bodys.session_key);
      console.log("返回openid:", bodys);
      ctx.body = {
        openid,
      };
    });
  }
}
module.exports = new Api();
