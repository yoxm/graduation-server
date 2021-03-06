const Sequelize = require("sequelize");
import sequelize from "../lib/sequelize";

const teacherModel = sequelize.define(
  "teacher",
  {
    id: {
      type: Sequelize.STRING(32),
      primaryKey: true
    },
    teacherId: Sequelize.STRING(255),
    password: Sequelize.STRING(255),
    name: Sequelize.STRING(255),
    age: Sequelize.INTEGER(3),
    sex: Sequelize.STRING(3),
    academy: Sequelize.STRING(255),
    profession: Sequelize.STRING(255)
  },
  {
    timestamps: false
  }
);
module.exports = teacherModel;
