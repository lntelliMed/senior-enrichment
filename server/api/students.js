'use strict'

const apiRouter = require('express').Router();
const {Student, Campus} = require('../db/models');

apiRouter.get('/', (req, res, next) => {
	Student.findAll({ include: [Campus] })
		.then(students => res.json(students))
		.catch(next);
});

apiRouter.get('/:studentId', (req, res, next) => {
	Student.findById(req.params.studentId)
		.then(student => res.json(student))
		.catch(next);
});

apiRouter.post('/', function (req, res, next) {
	// Campus.find({where: {name: req.body.campusName}})
	// .then(campus => {
	// 	req.body.campusId = campus.id;
	// 	return Student.create(req.body)
	// })
	// .then(student => res.json(student))
	// .catch(next);
	Student.create(req.body)
		.then(student => res.json(student))
		.catch(next);
});

apiRouter.put('/:studentId', function (req, res, next) {
		Student.update(req.body, { where: { id: req.params.studentId}})
		.then((student) => {
			return res.json(student)
		})
		.catch(next);
});

apiRouter.delete('/:studentId', function (req, res, next) {
	Student.destroy({where: {id: req.params.studentId}})
		.then((response) => res.send('Deletion was successfull!'))
		.catch(next);
});

module.exports = apiRouter;
