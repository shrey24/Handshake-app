
// $ npx sequelize model:create --name student_experience --attributes student_id:string

module.exports = (sequelize, DataTypes) => {
    const student_profile = sequelize.define('student_profile', {
        user_id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.STRING,
        },
        career_objective: {
            type: DataTypes.STRING,
        },
        address_city: {
            type: DataTypes.STRING,
        },
        address_state: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        address_country: {
            type: DataTypes.STRING,
        },
        university: {
            type: DataTypes.STRING,
        },
        major: {
            type: DataTypes.STRING,
        },
        degree: {
            type: DataTypes.STRING,
        },
        start_date: {
            type: DataTypes.DATEONLY,
        },
        end_date: {
            type: DataTypes.DATEONLY,
        },
        GPA: {
            type: DataTypes.FLOAT,
        }
    }, {
        underscored: true
    });

    return student_profile;
}