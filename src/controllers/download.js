import commentedTeacherModel from "../models/commentedTeacherModel";
import nodeExcel from "excel-export";

export let exportTeacher = async ctx => {
  console.log("====================================");
  console.log("开始导出参评教师名单");
  console.log("====================================");
  let conf = {
    stylesXmlFile: "styles.xml",
    name: "mysheet",
    cols: [
      {
        caption: "姓名",
        type: "string"
      },
      {
        caption: "职称",
        type: "string"
      },
      {
        caption: "参评日期",
        type: "string"
      },
      {
        caption: "学院",
        type: "string"
      }
    ]
  };
  const teachers = await commentedTeacherModel.findAll();
  let temp = [];
  const parsedTeacher = JSON.parse(JSON.stringify(teachers));
  parsedTeacher.map(item => {
    let bufferArr = [
      item.name,
      item.profession,
      item.commentDate,
      item.academy
    ];
    temp.push(bufferArr);
  });
  conf["rows"] = temp;
  const excel = nodeExcel.execute(conf);
  console.log(excel);
  let data = new Buffer(excel, "binary");
  ctx.set("Content-Type", "application/vnd.openxmlformats");
  ctx.set("Content-Disposition", "attachment; filename=" + "teachers.xlsx");
  console.log("处理数据：", data);
  ctx.body = data;
};
