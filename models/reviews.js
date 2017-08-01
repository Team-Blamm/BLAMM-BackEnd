'use strict';
module.exports = function(sequelize, DataTypes) {
  // var users = require('./users')(sequelize, DataTypes);
  var reviews = sequelize.define('reviews', {
    rating: {
      type: Sequelize.INTEGER
    },
    review: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

reviews.associate = function(models) {
  this.belongsTo(models.users, {foreignKey: 'userId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'userReviews'});
  this.belongsTo(models.products, {foreignKey: 'prodId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'productReviews'});
};

return reviews;
}
