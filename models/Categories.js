const Sequelize = require('sequelize');

module.exports = sequelize => {
    return  sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: Sequelize.STRING,
            allowNull: false
        },
        image:{
            type: Sequelize.STRING,
            allowNull: false
        },
        path:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
}