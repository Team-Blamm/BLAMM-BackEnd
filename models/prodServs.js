'use strict';
module.exports = function(sequelize, DataTypes) {
  var prodServs = sequelize.define('prodServs', {
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

prodServs.associate = function(models) {
  this.belongsTo(models.products, {foreignKey: 'prodId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'productServices'});
  this.belongsTo(models.services, {foreignKey: 'servId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'servedProducts'});
};

return prodServs;
}
