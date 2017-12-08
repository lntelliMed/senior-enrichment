'use strict'
const apiRouter = require('express').Router()
const {Student, Campus} = require('../db/models')

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
// apiRouter.get('/hello', (req, res) => res.send({ hello: 'world' }))

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create
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
	console.log('................. ', req.body)
	Student.create(req.body)
		.then(student => res.json(student))
		.catch(next);
});

apiRouter.delete('/:studentId', function (req, res, next) {
	console.log('................. ', req.body)
	Student.destroy({where: {id: req.params.studentId}})
		.then(response => res.send('Deletion was successfull!'))
		.catch(next);
});

module.exports = apiRouter;
