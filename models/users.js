'use strict';

module.exports = function(Sequelize, DataTypes) {
  // var posts = require('./posts')(Sequelize, DataTypes)
  var users = Sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgSrc: {
      type: DataTypes.TEXT
    },
    admin: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {})

  users.associate = function(models) {
    this.hasMany(models.products, {as: 'userProducts', foreignKey: 'userId'});
    this.hasMany(models.receipts, {as: 'userReceipts', foreignKey: 'userId'});
    this.hasMany(models.reviews, {as: 'userReviews', foreignKey: 'userId'});
  };
  return users;
}
