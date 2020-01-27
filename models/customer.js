/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    guid: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'customer'
  });
};
