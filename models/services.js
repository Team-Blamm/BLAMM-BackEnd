'use strict';

module.exports = function(Sequelize, DataTypes) {
  var services = Sequelize.define('services', {
    tag: {
      type: DataTypes.STRING,
      allowNull: false
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

  services.associate = function(models) {
    this.hasMany(models.prodServ, {as: 'relatedProducts', foreignKey: 'servId'});
  };
  return services;
}
