const db = require('../server/db')
const { Campus, Student } = require('../db/models')

const chalk = require('chalk')
const Chance = require('chance')
const chance = new Chance()

async function seed() {
  await db.sync({ force: true })
  console.log(chalk.bgBlue.white.bold('db synced!'))

  const campuses = await Promise.all([
    Campus.create({ name: `${chance.country({ full: true })} University`, image: 'http://via.placeholder.com/350x350' }),
    Campus.create({ name: `${chance.country({ full: true })} University`, image: 'http://via.placeholder.com/350x350' }),
    Campus.create({ name: `${chance.country({ full: true })} University`, image: 'http://via.placeholder.com/350x350' }),
    Campus.create({ name: `${chance.country({ full: true })} University`, image: 'http://via.placeholder.com/350x350' }),
  ])

  const students = await Promise.all([
    Student.create({ name: chance.name(), campusId: chance.integer({ min: 1, max: campuses.length }), email: 'me@mail.com' }),
    Student.create({ name: chance.name(), campusId: chance.integer({ min: 1, max: campuses.length }), email: 'me@mail.com' }),
    Student.create({ name: chance.name(), campusId: chance.integer({ min: 1, max: campuses.length }), email: 'me@mail.com' }),
    Student.create({ name: chance.name(), campusId: chance.integer({ min: 1, max: campuses.length }), email: 'me@mail.com' }),
    Student.create({ name: chance.name(), campusId: chance.integer({ min: 1, max: campuses.length }), email: 'me@mail.com' }),
    Student.create({ name: chance.name(), campusId: chance.integer({ min: 1, max: campuses.length }), email: 'me@mail.com' }),
    Student.create({ name: chance.name(), campusId: chance.integer({ min: 1, max: campuses.length }), email: 'me@mail.com' }),
  ])

  console.log(chalk.bgRed.white.bold(`Seeded ${campuses.length} campuses, ${students.length} students`))
  console.log(chalk.bgGreen.white.bold(`Seeded successfully`))
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

console.log('seeding...')
