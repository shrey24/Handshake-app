const mongoose = require('mongoose');

const student_exp_schema = new mongoose.Schema({
  company_name: {
      type: String,
      default: null
  },
  title: {
      type: String,
      default: null
  },
  location: {
      type: String,
      default: null
  },
  start_date: {
      type: Number,
      default: null
  },
  end_date: {
      type: Number,
      default: null
  },
  work_desc: {
      type: String,
      default: null
  }
});

const student_experience = mongoose.model('student_experience', student_exp_schema);

module.exports = { student_experience, student_exp_schema };