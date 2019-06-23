const Sequelize = require('sequelize');
const ReviewsModel = require("./Reviews");

module.exports = sequelize => {
    const Reviews = ReviewsModel(sequelize);
    let restaurants = sequelize.define('restaurants', {
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
    restaurants.hasMany(Reviews);
    return restaurants;
}