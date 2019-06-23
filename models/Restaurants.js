const Sequelize = require('sequelize');

module.exports = sequelize => {
    return  sequelize.define('restaurants', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        category:{
            type: Sequelize.STRING,
            allowNull: false
        },
        address:{
            type: Sequelize.STRING,
            allowNull: false
        },
        image:{
            type: Sequelize.STRING,
            allowNull: false
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: false
    });
}