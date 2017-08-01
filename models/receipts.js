'use strict';
module.exports = function(sequelize, DataTypes) {
  // var users = require('./users')(sequelize, DataTypes);
  var receipts = sequelize.define('receipts', {
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

receipts.associate = function(models) {
  this.belongsTo(models.users, {foreignKey: 'userId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'userReceipts'});
  this.hasMany(models.orders, {as: 'receiptOrders', foreignKey: 'receiptId'});
};

return receipts;
}
