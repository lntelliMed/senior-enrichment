const Sequelize = require('sequelize');
const db = require('../index');


module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://images.unsplash.com/photo-1496229133771-d8758d6b9a38?auto=format&fit=crop&w=2725&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'
  },
  description: {
    type: Sequelize.TEXT
  }
});
