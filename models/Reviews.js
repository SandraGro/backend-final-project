const Sequelize = require('sequelize');
const UsersModel = require("./Users");

module.exports = sequelize => {
    const Users = UsersModel(sequelize);
    let reviews =  sequelize.define('reviews', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        review:{
            type: Sequelize.STRING,
            allowNull: false
        },
        restaurantId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        rating:{
            type: Sequelize.FLOAT,
            allowNull: false
        },
        userId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    reviews.belongsTo(Users);
    return reviews;
}