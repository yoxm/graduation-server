import Sequelize from "sequelize";
import sequelize from "../lib/sequelize";

const evaluateResultModel = sequelize.define(
  "evaluate-result",
  {
    id: {
      type: Sequelize.STRING(32),
      primaryKey: true
    },
    appraiser: Sequelize.STRING(255),
    evaluateResult: Sequelize.STRING(5000),
    commentedTeacher: Sequelize.STRING(255)
  },
  {
    timestamps: false
  }
);
module.exports = evaluateResultModel;
