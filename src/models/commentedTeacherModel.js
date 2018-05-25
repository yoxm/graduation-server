import Sequelize from "sequelize";
import sequelize from "../lib/sequelize";

const commentedTeacherModel = sequelize.define(
  "commented_teacher",
  {
    id: {
      type: Sequelize.STRING(32),
      primaryKey: true
    },
    name: Sequelize.STRING(255),
    commentDate: Sequelize.DATE(255),
    academyId: Sequelize.STRING(32),
    academy: Sequelize.STRING(255),
    profession: Sequelize.STRING(255),
    isCommented: Sequelize.STRING(16)
  },
  {
    timestamps: false
  }
);
module.exports = commentedTeacherModel;
