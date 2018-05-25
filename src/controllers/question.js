import questionModel from "../models/questionModel";

/**
 * 根据学院查问题
 * @param {type} type
 * 001 计算机学院
 * 002 机械学院
 */
export let getQuestionByType = async ctx => {
  console.log("根据type返回question");
  const { type } = ctx.query;
  const questions = await questionModel.findAll({
    where: {
      type: type
    }
  });
  if (questions.length === 0) {
    ctx.response.status = 200;
    ctx.body = {
      code: 0,
      info: "未找到",
      data: {}
    };
  } else {
    ctx.response.status = 200;
    let ans = [];
    questions.map(item => {
      let values = item.dataValues;
      ans.push({
        id: values.id,
        header: values.header,
        desc: values.desc,
        type: type,
        ans: [
          { ans: values.ans1, value: "01" },
          { ans: values.ans2, value: "02" },
          { ans: values.ans3, value: "03" }
        ]
      });
    });
    ctx.body = {
      code: 0,
      info: "查找成功",
      data: {
        ans
      }
    };
  }
};

