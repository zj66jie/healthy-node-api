//没使用，切换到back内直接用
const multer = require("@koa/multer");
const path = require("path");
const logger = require("./log4");
//上传文件存放路径、及文件命名
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, path.join(__dirname, "/public"));
  // },
  // 文件保存路径, 这里需要自己手动到public下面新建upload文件夹。
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  // filename: function (req, file, cb) {
  //   logger.debug(req);
  //   console.log(file);
  //   let fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
  //   //文件名字，时间+原文件名字
  //   let fileNowName =
  //     Date.now() + fileFormat[0] + "." + fileFormat[fileFormat.length - 1];

  //   BackApi.imgName(fileNowName);
  //   cb(null, fileNowName);
  //   // let type = file.originalname.split(".")[1];
  //   // cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
  // },

  filename(req, file, cb) {
    // logger.debug(req);
    console.log(file);
    let fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
    //文件名字，时间+原文件名字
    let fileNowName =
      Date.now() + fileFormat[0] + "." + fileFormat[fileFormat.length - 1];

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

module.exports = upload;
