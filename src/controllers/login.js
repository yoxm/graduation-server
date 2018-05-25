import studentModel from "../models/studentModel";
import teacherModel from "../models/teacherModel";

export default async (ctx, next) => {
  console.log("开始登陆，");
  console.log(ctx.request.body);
  const { id, password, selectedType } = ctx.request.body;
  if (selectedType && selectedType === "student") {
    const student = await studentModel.findAll({
      where: {
        studentId: id,
        password: password
      }
    });
    console.log(student[0].dataValues);
    console.log(`find ${student.length} student:`);
    const studentValue = student[0].dataValues;
    if (student.length > 0) {
      ctx.response.status = 200;
      ctx.body = {
        code: 0,
        info: "登陆成功",
        data: {
          accessToken: `${new Date().getTime()}-${id}`,
          userInfo: studentValue
        }
      };
    } else {
      ctx.body = {
        code: 1,
        info: "登陆失败",
        data: {}
      };
    }
  } else {
    const teacher = await teacherModel.findAll({
      where: {
        teacherId: id,
        password: password
      }
    });
    const teacherValue = teacher[0].dataValues;
    if (teacher.length > 0) {
      ctx.response.status = 200;
      ctx.body = {
        code: 0,
        info: "登陆成功",
        data: {
          accessToken: `${new Date().getTime()}-${id}`,
          userInfo: teacherValue
        }
      };
    } else {
      ctx.body = {
        code: 1,
        info: "登陆失败",
        data: {}
      };
    }
  }
};
