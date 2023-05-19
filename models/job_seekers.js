const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class job_seekers extends Model {}
job_seekers.init({
    seeker_id:{
            type: DataTypes.INTEGER,
            field : 'seeker_id'
        },
        fname: {
            type: DataTypes.VARCHAR,
            field : 'fname'
        },
        lname: {
            type: DataTypes.VARCHAR,
            field : 'lname'
        },
        email: {
            type: DataTypes.VARCHAR,
            field : 'email'
        },
        resume: {
            type: DataTypes.VARCHAR,
            field : 'resume'
        },

    
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'job_seekers',
        tableName: 'job_seekers',
        sequelize,
    })

module.exports = job_seekers
