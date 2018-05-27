import Sequelize from "sequelize";
import sequelize from "../lib/sequelize";

const studentModel = sequelize.define(
  "student",
  {
    id: {
      type: Sequelize.STRING(32),
      primaryKey: true
    },
    studentId: Sequelize.STRING(255),
    name: Sequelize.STRING(255),
    age: Sequelize.INTEGER(3),
    sex: Sequelize.STRING(3),
    academy: Sequelize.STRING(255),
    academyId: Sequelize.STRING(16)
  },
  {
    timestamps: false
  }
);
module.exports = studentModel;
