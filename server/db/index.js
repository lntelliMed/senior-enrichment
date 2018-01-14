'use strict'
const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${pkg.name}`;

console.log(chalk.yellow("Opening database connection"));

module.exports = new Sequelize(dbUrl, {
  logging: false,
});
