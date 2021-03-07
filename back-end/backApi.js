const multer = require("@koa/multer");
const path = require("path");
var config = require("../config.js");
let imgName;
//文件保存设置
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, path.join(__dirname, "/public"));
  // },
  // 文件保存路径, 这里需要自己手动到public下面新建upload文件夹。
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },

  filename(req, file, cb) {
    // logger.debug(req);
    console.log(file);
    let fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
    //文件名字，时间+原文件名字
    let fileNowName =
      Date.now() + fileFormat[0] + "." + fileFormat[fileFormat.length - 1];
    imgName = fileNowName;
    // BackApi.imgName(fileNowName);
    cb(null, fileNowName);
    // let type = file.originalname.split(".")[1];
    // cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  },
});
//文件上传限制
const limits = {
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4, // 限制4m
  },
};
const upload = multer({ storage, limits });
console.log(imgName);
class BackApi {
  constructor() {
    this.name = "";
  }

  backApi(router, mysql) {
    // const koa2Req = require("koa2-request");

    // 注入验证过后人员名单
    router.post("/set_all_people", async (ctx, next) => {
      const { openid, name, age, gender, phoneNum, address } = ctx.request.body;
      mysql.query(
        `INSERT INTO all_people (openid,name,age,gender,phone,address) VALUES ('${openid}','${name}',${age},'${gender}','${phoneNum}','${address}')`
      );
      mysql.query(`DELETE FROM people_info WHERE openid = '${openid}'`);
      ctx.body = {
        mesg: "ok",
      };
    });
    // 删除已验证人员
    router.post("/delete_all_people", async (ctx, next) => {
      const { openid } = ctx.request.body;

      mysql.query(`DELETE FROM all_people WHERE openid = '${openid}'`);
      ctx.body = {
        mesg: "ok",
      };
    });
    // 获得所有已验证人员信息
    router.get("/people-all", async (ctx, next) => {
      let data = await mysql.select("all_people");
      // console.log(err);
      ctx.body = {
        code: 1,
        data: data,
        mesg: "ok",
      };
    });
    //获得所有待验证人员信息
    router.get("/people-info", async (ctx, next) => {
      let data = await mysql.select("people_info");
      // console.log(err);
      ctx.body = {
        code: 1,
        data: data,
        mesg: "ok",
      };
    });
    //上传图片,获取图片名字返回
    router.post("/add", upload.single("file"), async (ctx) => {
      // const { title, img, text } = ctx.request.body;
      console.log();
      // 返回结果给前端

      // console.log(imgName + "555");
      // if (img == "有") {
      //   if (imgName && title) {
      //     mysql.query(
      //       `INSERT INTO news (title,img,text) VALUES ('${title}','${
      //         config.http + imgName
      //       }','${text}')`
      //     );
      //   }
      // }
      // if (img == "无") {
      //   mysql.query(
      //     `INSERT INTO news (title,img,text) VALUES ('${title}','无','${text}')`
      //   );
      // }

      ctx.body = {
        mesg: "ok",
        imgName,
      };
    });
    //新闻存入存入数据库
    router.post("/add-news", async (ctx) => {
      const { title, img, text } = ctx.request.body;
      console.log();
      if (img == "无") {
        mysql.query(
          `INSERT INTO news (title,img,text) VALUES ('${title}','无','${text}')`
        );
      } else {
        mysql.query(
          `INSERT INTO news (title,img,text) VALUES ('${title}','${
            config.http + img
          }','${text}')`
        );
      }
      ctx.body = {
        mesg: "ok",
      };
    });
  }
}
module.exports = new BackApi();
// module.exports = BackApi;
