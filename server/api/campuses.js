'use strict'
const apiRouter = require('express').Router()
const {Campus, Student} = require('../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
// apiRouter.get('/hello', (req, res) => res.send({ hello: 'world' }))

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create
// apiRouter.get('/students', (req, res, next) => {
// 	Student.findAll()
// 		.then(students => res.json(students))
// 		.catch(next);
// });

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

module.exports = apiRouter;
