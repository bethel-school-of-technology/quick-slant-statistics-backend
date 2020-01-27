/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teams', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    division: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    wins: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lossess: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'teams'
  });
};
