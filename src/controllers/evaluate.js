import evaluateResultModel from "../models/evaluateResultModel";
import { getId } from "../tool/Common";

export let entryResult = async ctx => {
  console.log("评价结果录入开始");
  const { appraiser, evaluateResult, commentedTeacherId } = ctx.request.body;
  console.log("====================================");
  console.log(appraiser, evaluateResult, commentedTeacherId);
  console.log("====================================");
  const result = await evaluateResultModel.create({
    id: getId(),
    evaluateResult: evaluateResult,
    commentedTeacherId: commentedTeacherId,
    appraiser: appraiser
  });
  ctx.response.status = 200;
  ctx.body = {
    code: 0,
    info: `录入成功`,
    data: {}
  };
};

export let getEvaluateById = async ctx => {};

export let getEvaluate = async ctx => {};
