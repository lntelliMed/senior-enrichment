'use strict'
const apiRouter = require('express').Router()
const {Campus, Student} = require('../db/models')

apiRouter.get('/', (req, res, next) => {
	Campus.findAll({ include: [Student]})
		.then(campuses => res.json(campuses))
		.catch(next);
});

apiRouter.get('/:campusId', (req, res, next) => {
	Campus.findById(req.params.campusId)
		.then(campus => res.json(campus))
		.catch(next);
});

apiRouter.post('/', function (req, res, next) {
	Campus.create(req.body)
	.then(campus => res.json(campus))
	.catch(next);
});

apiRouter.delete('/:campusId', function (req, res, next) {
	Campus.destroy({where: {id: req.params.campusId}})
		.then((response) => res.send('Deletion was successfull!'))
		.catch(next);
});


apiRouter.put('/:campusId', function (req, res, next) {
	Campus.update(req.body, { where: { id: req.params.campusId } })
		.then((campus) => {
			return res.json(campus)
		})
		.catch(next);
});

module.exports = apiRouter;
