'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category)
      Course.hasMany(models.UserCourse)
    }
    capitalizeName() {
      this.name = this.name.toUpperCase();
      return this.save(); 
    }
  }
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Course name cannot be null'
        },
        notEmpty: {
          msg: 'Course name cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Course description cannot be null'
        },
        notEmpty: {
          msg: 'Course description cannot be empty'
        }
      }
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Course duration cannot be null'
        },
        notEmpty: {
          msg: 'Course duration cannot be empty'
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};