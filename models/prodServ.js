'use strict';
module.exports = function(sequelize, DataTypes) {
  var prodServ = sequelize.define('prodServ', {
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

prodServ.associate = function(models) {
  this.belongsTo(models.products, {foreignKey: 'prodId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'userPosts'});
  this.belongsTo(models.services, {foreignKey: 'servId', foreignKeyConstraint: true, onDelete: 'cascade', onUpdate: 'cascade', as: 'groups'});
};

return prodServ;
}
