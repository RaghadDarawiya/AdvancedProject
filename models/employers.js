const { DataTypes, Model} = require('@sequelize/core')
.then(
    if()
)
const sequelize = require('../db/mysql')
class employees extends Model {}
employees.init({
    id:{
            type: DataTypes.INTEGER,
            field : 'id'
        },
        companyname: {
            type: DataTypes.VARCHAR,
            field : 'companyname'
        },
        email: {
            type: DataTypes.VARCHAR,
            field : 'email'
        },
        phone: {
            type: DataTypes.VARCHAR,
            field : 'phone'
        },
    
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        modelName: 'employees',
        tableName: 'employees',
        sequelize,
    })

module.exports = employees
