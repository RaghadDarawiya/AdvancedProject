const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class job_applications extends Model {}
job_applications.init({
    app_id:{
            type: DataTypes.INTEGER,
            field : 'app_id'
        },
        job_id: {
            type: DataTypes.INTEGER,
            field : 'job_id'
        },
        seeker_id: {
            type: DataTypes.INTEGER,
            field : 'seeker_id'
        },
        app_date: {
            type: DataTypes.DATE,
            field : 'app_date'
        },
        cover_letter: {
            type: DataTypes.VARCHAR,
            field : 'cover_letter'
        },

    
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'job_applications',
        tableName: 'job_applications',
        sequelize,
    })

module.exports = job_applications
