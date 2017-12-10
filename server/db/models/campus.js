const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?auto=format&fit=crop&w=2700&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
  },
  description: {
    type: Sequelize.TEXT
  }
});
