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
    password: Sequelize.STRING(255),
    name: Sequelize.STRING(255)
  },
  {
    timestamps: false
  }
);
module.exports = studentModel;
