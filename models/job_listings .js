const { DataTypes, Model} = require('@sequelize/core')
const sequelize = require('../db/mysql')
class job_listings extends Model {}
job_listings.init({
    jobid:{
            type: DataTypes.INTEGER,
            field : 'jobid'
        },
        id:{
            type: DataTypes.INTEGER,
            field : 'id'
        },
        jobtitle: {
            type: DataTypes.VARCHAR,
            field : 'jobtitle'
        },
        jobdes: {
            type: DataTypes.LONGTEXT,
            field : 'jobdes'
        },
        jobreq: {
            type: DataTypes.LONGTEXT,
            field : 'jobreq'
        },
        SalaryRange: {
            type: DataTypes.VARCHAR,
            field : 'SalaryRange'
        },
        dateposted: {
            type: DataTypes.DATE,
            field : 'dateposted'
        },
    
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'job_listings',
        tableName: 'job_listings',
        sequelize,
    })

module.exports = job_listings