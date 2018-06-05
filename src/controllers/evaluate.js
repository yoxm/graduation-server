import evaluateResultModel from "../models/evaluateResultModel";
import Sequelize from "sequelize";
import sequelize from "../lib/sequelize";
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

export let getSatisfation = async ctx => {
  console.log("====================================");
  console.log("开始获取满意度 一般 及 不满意度");
  console.log("====================================");
  const res = await evaluateResultModel.findAll();
  const evaluateResultLength = res.length;
  let satisfactCount = {
    value: 0,
    name: "满意"
  };
  let generalCount = {
    value: 0,
    name: "一般"
  };
  let unSatisfactCount = {
    value: 0,
    name: "不满意"
  };
  JSON.parse(JSON.stringify(res)).map(item => {
    item.evaluateResult.length &&
      item.evaluateResult.map(value => {
        if (value.ans.ans === "满意") {
          satisfactCount.value++;
        } else if (value.ans.ans === "一般") {
          generalCount.value++;
        } else {
          unSatisfactCount.value++;
        }
      });
  });
  const convent = obj => {
    return (obj.value / (evaluateResultLength * 3)).toFixed(2);
  };
  satisfactCount.value = convent(satisfactCount);
  generalCount.value = convent(generalCount);
  unSatisfactCount.value = convent(unSatisfactCount);
  ctx.body = {
    code: 0,
    info: "查询成功",
    data: {
      rate: [satisfactCount, generalCount, unSatisfactCount]
    }
  };
};

export let getSatisfationMost = async ctx => {
  console.log("====================================");
  console.log("获取收到满意最多的老师");
  console.log("====================================");
  let satisfactMostArr = [];
  let countArr = [];

  //  处理收到满意最多的
  const satisfactRes = await sequelize.query(
    "SELECT SUM(satisfactRate) as sr , commented_teachers.`name` as name " +
      "from evaluate_results, commented_teachers " +
      "WHERE evaluate_results.commentedTeacherId = commented_teachers.id " +
      "GROUP BY commentedTeacherId ORDER BY sr limit 0, 10;"
  );
  let satisfacts = JSON.parse(JSON.stringify(satisfactRes))[0];

  satisfacts.length &&
    satisfacts.map(item => {
      let obj = {
        name: item.name,
        value: [item.sr, item.name]
      };
      satisfactMostArr.push(obj);
    });

  const countRes = await sequelize.query(
    "SELECT COUNT(appraiser) as count , commented_teachers.`name` as name " +
      "from evaluate_results, commented_teachers " +
      "WHERE evaluate_results.commentedTeacherId = commented_teachers.id " +
      "GROUP BY commentedTeacherId ORDER BY count limit 0, 10;"
  );
  let counts = JSON.parse(JSON.stringify(countRes))[0];
  counts.length &&
    counts.map(item => {
      let obj = {
        name: item.name,
        value: [item.count, item.name]
      };
      countArr.push(obj);
    });
  console.log(countArr, satisfactMostArr);
  ctx.body = {
    code: 0,
    info: "查询成功",
    data: {
      evaluate: [
        {
          time: "人气最旺的十位老师（投票人数）",
          data: countArr
        },
        {
          time: "收到满意最多的老师",
          data: satisfactMostArr
        }
      ]
    }
  };
};
