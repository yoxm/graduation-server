import evaluateResultModel from "../models/evaluateResultModel";
import { getId } from "../tool/Common";

export let entryResult = async ctx => {
  console.log("评价结果录入开始");
  const {
    appraiser,
    evaluateResult,
    commentedTeacherId,
    satisfactRate
  } = ctx.request.body;
  console.log("====================================");
  console.log(appraiser, evaluateResult, commentedTeacherId, satisfactRate);
  console.log("====================================");
  const result = await evaluateResultModel.create({
    id: getId(),
    evaluateResult: evaluateResult,
    commentedTeacherId: commentedTeacherId,
    appraiser: appraiser,
    satisfactRate: satisfactRate
  });
  ctx.response.status = 200;
  ctx.body = {
    code: 0,
    info: `录入成功`,
    data: {}
  };
};

export let getEvaluateByTeacherId = async ctx => {
  const teacherId = ctx.query;
  console.log("====================================");
  console.log(`根据teacherId获取评价结果,${teacherId}`);
  console.log("====================================");
  const res = await evaluateResultModel.findAll({
    where: {
      teacherId: teacherId
    }
  });
  console.log(res);
  return res;
};

export let getEvaluate = async ctx => {};

export let analyseEvaluate = async ctx => {
  console.log("====================================");
  console.log("开始分析");
  console.log("====================================");
  const res = await evaluateResultModel.findAll();
  let satisfactRateArr = [];
  let generalRateArr = [];
  let unsatisfactRateArr = [];
  res.map(item => {
    item = JSON.stringify(item);
    if (item.evaluateResult.ans.ans === "满意") {

    }
  });
};
