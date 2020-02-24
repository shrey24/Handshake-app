'use strict';
module.exports = (sequelize, DataTypes) => {
  const student_experience = sequelize.define('student_experience', {
    student_id : {
      type: DataTypes.INTEGER,
      allowNull: false    
    },
    company_name : {
      type: DataTypes.STRING,
    },
    title : {
      type: DataTypes.STRING,
    },
    location : {
      type: DataTypes.STRING,
    },
    start_date : {
      type: DataTypes.DATEONLY,
    },
    end_date : {
      type: DataTypes.DATEONLY,
    },
    work_description : {
      type: DataTypes.TEXT,
    }
  }, {
    underscored: true
  });
  // student_experience.associate = function(models) {
  //   // associations can be defined here
  // };
  return student_experience;
};