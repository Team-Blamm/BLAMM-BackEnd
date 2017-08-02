'use strict';
module.exports = function(Sequelize, DataTypes) {
  var products = Sequelize.define('products', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    rate: {
      type: DataTypes.DECIMAL
    },
    type: {
      type: DataTypes.STRING
    },
    tagline: {
      type: DataTypes.STRING
    },
    imgSrc: {
      type: DataTypes.TEXT
    },
    bgImg: {
      type: DataTypes.TEXT
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

products.associate = function(models) {
  this.belongsTo(models.users, {foreignKey: 'userId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'userProducts'});
  this.hasMany(models.orders, {as: 'productOrders', foreignKey: 'prodId'});
  this.hasMany(models.reviews, {as: 'productReviews', foreignKey: 'prodId'});
  this.hasMany(models.prodServs, {as: 'productServices', foreignKey: 'prodId'})
};

return products;
}
