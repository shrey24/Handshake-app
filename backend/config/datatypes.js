
const user_types = {
    'student' : 0,
    'company' : 1,
    fromNumber(n) {return (n === 0 ?'student':'company')}
}

module.exports =   user_types ;


  