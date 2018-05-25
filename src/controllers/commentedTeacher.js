import commentedTeacherModel from "../models/commentedTeacherModel";
import sequelize from "sequelize";

/**
 * 获取被评价的老师
 * @param {any} ctx
 */
export let getCommentedTeacher = async ctx => {
  console.log("获取教师信息");
  const commentedTeacher = await commentedTeacherModel.findAll({
    where: {
      isCommented: "0"
    }
  });
  let dataArr = [];
  if (commentedTeacher.length === 0) {
    ctx.response.status = 200;
    ctx.body = {
      code: 1,
      info: "未查询到数据",
      data: {}
    };
  } else {
    commentedTeacher.map(item => {
      const value = item.dataValues;
      dataArr.push(value);
    });
  }
  ctx.response.status = 200;
  ctx.body = {
    code: 1,
    info: `查询到${commentedTeacher.length}条数据`,
    data: {
      teacher: dataArr
    }
  };
};

/**
 * 设置评价老师评价状态
 * 0 未评价
 * 1 已评价
 */
export let setCommentedById = async ctx => {
  const { id } = ctx.query;
  console.log("====================================");
  console.log("开始设置状态，教师id为：", id);
  console.log("====================================");
  const result = await commentedTeacherModel.update(
    {
      isCommented: "1"
    },
    {
      where: {
        id: id
      }
    }
  );
  console.log(result);
};
