const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      isEmpty: false
    }
  },
  gpa: {
    type: Sequelize.DOUBLE,
    validate: {
      min: 0.0,
      max: 4.0
    }
  },
  name: {
    type: Sequelize.VIRTUAL,
    get () {
      return this.firstName + " " + this.lastName;
    }
  }
});
