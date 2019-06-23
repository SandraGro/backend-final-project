const Sequelize = require('sequelize');

module.exports = sequelize => {
    return  sequelize.define('reviews', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        review:{
            type: Sequelize.STRING,
            allowNull: false
        },
        restaurant_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rating:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
}