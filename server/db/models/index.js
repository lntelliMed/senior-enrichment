'use strict';

const db = require('../index');
const Student = require('./student');
const Campus = require('./campus');

Student.belongsTo(Campus, {onDelete: 'CASCADE'});
Campus.hasMany(Student);

module.exports = {
	db,
	Student,
	Campus
}
