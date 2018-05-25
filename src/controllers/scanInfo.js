import commentedTeacherModel from "../models/commentedTeacherModel";

export default async ctx => {
  console.log("开始录入");
  console.log(ctx.request.body);
  const now = Date.now();
  const { name, date, profession, academy } = ctx.request.body;
  const teacher = await commentedTeacherModel.create({
    id: "sau-" + now,
    name: name,
    academy: academy[0],
    profession: profession[0],
    createdAt: new Date(),
    updatedAt: new Date()
  });
  ctx.response.status = 200;
  ctx.body = {
    code: 0,
    info: "录入成功",
    data: {
      info: teacher
    }
  };
};
