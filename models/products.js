'use strict';
module.exports = function(sequelize, DataTypes) {
  var posts = sequelize.define('products', {
    title: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    rate: {
      type: Sequelize.DECIMAL
    },
    type: {
      type: Sequelize.STRING
    },
    tagline: {
      type: Sequelize.STRING
    },
    imgSrc: {
      type: Sequelize.TEXT
    },
    bgImg: {
      type: Sequelize.TEXT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});

products.associate = function(models) {
  this.belongsTo(models.users, {foreignKey: 'userId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'userProducts'});
  this.hasMany(models.orders, {as: 'productOrders', foreignKey: 'prodId'});
  this.hasMany(models.reviews, {as: 'productReviews', foreignKey: 'prodId'});
};

return products;
}
