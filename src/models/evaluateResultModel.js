import Sequelize from "sequelize";
import sequelize from "../lib/sequelize";

const evaluateResultModel = sequelize.define(
  "evaluate_result",
  {
    id: {
      type: Sequelize.STRING(32),
      primaryKey: true
    },
    appraiser: Sequelize.STRING(255),
    evaluateResult: Sequelize.JSON(5000),
    commentedTeacherId: Sequelize.STRING(32)
  },
  {
    timestamps: false
  }
);
module.exports = evaluateResultModel;
