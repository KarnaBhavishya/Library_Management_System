const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URI || "postgres://postgres:admin@127.0.0.1:5432/library_db", {
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    console.log("Connecting to PostgreSQL...");
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("PostgreSQL Connected!");
  } catch (error) {
    console.log("===== ERROR =====");
    console.error("Unable to connect to the database:", error.message);
    console.log("=================");
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };