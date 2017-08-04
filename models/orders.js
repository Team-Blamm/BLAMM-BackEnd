'use strict';
module.exports = function(sequelize, DataTypes) {
  var orders = sequelize.define('orders', {
    quantity: {
      type: DataTypes.DECIMAL
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

orders.associate = function(models) {
  this.belongsTo(models.products, {foreignKey: 'prodId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'prodOrders'});
  this.belongsTo(models.receipts, {foreignKey: 'receiptId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'receiptOrders'});
};

return orders;
}
