
const user_types = {
    'student' : 0,
    'company' : 1,
    fromNumber(n) {return (n === 0 ?'student':'company')}
}

const USER_STUDENT = 'student';
const USER_COMPANY = 'company';

module.exports = { USER_COMPANY, USER_STUDENT, user_types };


  