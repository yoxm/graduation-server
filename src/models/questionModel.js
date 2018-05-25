const Sequelize = require("sequelize");
import sequelize from "../lib/sequelize";

const questionModel = sequelize.define(
  "question",
  {
    id: {
      type: Sequelize.STRING(32),
      primaryKey: true
    },
    header: Sequelize.STRING(255),
    ans1: Sequelize.STRING(255),
    ans2: Sequelize.STRING(255),
    ans3: Sequelize.STRING(255),
    type: Sequelize.STRING(255),
    desc: Sequelize.STRING(255)
  },
  {
    timestamps: false
  }
);
module.exports = questionModel;
