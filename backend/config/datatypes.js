
const user_types = {
    'student' : 0,
    'company' : 1,
    fromNumber(n) {return (n === 0 ?'student':'company')}
}

const USER_STUDENT = 'STUDENT';
const USER_COMPANY = 'COMPANY';

module.exports = { USER_COMPANY, USER_STUDENT, user_types };


  