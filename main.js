'use strict';

const db = require('./server/db/models').db;
const app = require('./server');
const PORT = process.env.PORT || 1337;

db.sync({force: false}) // if you update your db schemas, make sure you drop the tables first and then recreate them
.then(() => {
  console.log('db synced')
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
});
