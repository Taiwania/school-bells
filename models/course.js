'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courses.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      startTime: DataTypes.TIME,
      endTime: DataTypes.TIME,
      weekSet: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Course',
      tableName: 'Courses',
      underscored: true
    }
  )
  return Course
}
