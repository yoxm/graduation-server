import KoaRouter from "koa-router";
import controllers from "../controllers/index.js";

const router = new KoaRouter();

router
  .get("/public/get", function(ctx, next) {
    ctx.body = "禁止访问！";
  }) // 以/public开头则不用经过权限认证
  .all("/upload", controllers.upload.default)
  .get("/api/:name", controllers.api.Get)
  .post("/login", controllers.login.default)
  .post("/public/scanInfo", controllers.scanInfo.default)
  .get("/public/getQuestionByType", controllers.question.getQuestionByType)
  .get(
    "/public/getCommentedTeacher",
    controllers.commentedTeacher.getCommentedTeacher
  )
  .get(
    "/public/setCommentedById",
    controllers.commentedTeacher.setCommentedById
  );
module.exports = router;
