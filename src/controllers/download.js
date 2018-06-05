import commentedTeacherModel from "../models/commentedTeacherModel";
import sequelize from "../lib/sequelize";
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

export let exportEvaluate = async ctx => {
  console.log("====================================");
  console.log("开始导出评价结果");
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
        caption: "学院",
        type: "string"
      },
      {
        caption: "投票人数",
        type: "string"
      },
      {
        caption: "收到满意总和",
        type: "string"
      }
    ]
  };
  const countRes = await sequelize.query(
    "SELECT COUNT(appraiser) as count , SUM(satisfactRate) as sr, commented_teachers.`name`, commented_teachers.`academy`" +
      "from evaluate_results, commented_teachers " +
      "WHERE evaluate_results.commentedTeacherId = commented_teachers.id " +
      "GROUP BY commentedTeacherId ORDER BY count limit 0, 10;"
  );
  let counts = JSON.parse(JSON.stringify(countRes))[0];
  console.log(counts);
  let temp = [];
  counts.length &&
    counts.map(item => {
      let bufferArr = [item.name, item.academy, item.count, item.sr + ""];
      temp.push(bufferArr);
    });
  console.log(temp);
  conf["rows"] = temp;
  const excel = nodeExcel.execute(conf);
  let data = new Buffer(excel, "binary");
  ctx.set("Content-Type", "application/vnd.openxmlformats");
  ctx.set(
    "Content-Disposition",
    "attachment; filename=" + "evaluate_count.xlsx"
  );
  console.log("处理数据：", data);
  ctx.body = data;
};
