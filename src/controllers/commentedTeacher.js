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
  ctx.response.status = 200;
  ctx.body = {
    code: 0,
    info: `设置成功`,
    data: {}
  };
};

/**
 * 根据id更新教师数据
 */
export let updateTeacherById = async ctx => {
  console.log("====================================");
  console.log("开始更新");
  console.log("====================================");
  const { id, name, academy, profession, date } = ctx.request.body;
  console.log(ctx.request.body);
  const result = await commentedTeacherModel.update(
    {
      name: name,
      academy: academy,
      profession: profession,
      commentedDate: date
    },
    {
      where: {
        id: id
      }
    }
  );
  ctx.response.status = 200;
  ctx.body = {
    code: 0,
    info: "更新成功",
    data: {}
  };
};

/**
 * 根据id获取参评教师信息
 */
export let getTeacherInfoById = async ctx => {
  const id = ctx.query;
  console.log("====================================");
  console.log(`根据${id}查询参评教师信息`);
  console.log("====================================");
  const teacherInfo = await commentedTeacherModel.findAll();
  return teacherInfo;
};
