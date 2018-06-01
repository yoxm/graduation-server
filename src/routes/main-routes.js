import KoaRouter from "koa-router";
import controllers from "../controllers/index.js";

const router = new KoaRouter();

/**
 * 以/public开头则不用经过权限认证
 */
router
  .get("/public/get", function(ctx, next) {
    ctx.body = "禁止访问！";
  })
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
  )
  .post("/public/entryResult", controllers.evaluate.entryResult)
  .post(
    "/public/updateTeacherById",
    controllers.commentedTeacher.updateTeacherById
  )
  .get("/public/getAnalyseRes", controllers.evaluate.analyseEvaluate)
  .get("/public/exportTeacher", controllers.download.exportTeacher);

module.exports = router;
