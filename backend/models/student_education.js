'use strict';
const sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  const student_education = sequelize.define('student_education', {
    // user_id : {
    //   type: DataTypes.INTEGER,
    //   allowNull: false   
    // },
    degree : {
      type: DataTypes.STRING,
    },
    major : {
      type: DataTypes.STRING,
    },
    start_date : {
      type: DataTypes.DATEONLY,
    },
    end_date : {
      type: DataTypes.DATEONLY,
    },
    GPA : {
      type: DataTypes.FLOAT,
    },


  }, {
    underscored: true
  });
  // student_education.associate = function(models) {
  //   // associations can be defined here
  // };
  return student_education;
};