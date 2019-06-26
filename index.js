const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log('server running'))

const sequelize = new Sequelize('sandraalejandra_letseat', 'sandraalejandra_usuarioletseat', 'RdMRLSUtCyWX', {
    host: 'cpanel.sandraalejandra.com',
    dialect: "mysql"
});

const CategoriesModel = require("./models/Categories")
const RestaurantsModel = require("./models/Restaurants")
const Categories = CategoriesModel(sequelize)
const Restaurants = RestaurantsModel(sequelize)
const ReviewsModel = require("./models/Reviews");
const Reviews = ReviewsModel(sequelize);
const UsersModel = require("./models/Users");
const Users = UsersModel(sequelize);

app.get('/search', (request, response) => {
    let query = request.query.q
    let config = {
        where: {
            name: {
                [Sequelize.Op.like]: '%' + query + '%'
            }
        },
        include: [
            {
                model: Reviews,
                limit: 1,
                order: [["id", "desc"]],
                include: [Users]
            }
        ]
    }
    Restaurants.findAll(config).then(result => {
        response.send(result);
    });
});

app.get("/restaurants/:category", (request, response) => {
    let filterCategory = request.params.category
    let config = {
        where: {
            category: filterCategory
        },
        include: [
            {
                model: Reviews,
                limit: 1,
                order: [["id", "desc"]],
                include: [Users]
            }
        ]
    }
    Restaurants.findAll(config).then(result => {
        response.send(result);
    });
});

app.get('/categories', (request, response) => {
    Categories.findAll().then(result => {
        response.send(result);
    });
});

app.get('/restaurant/:id', (request, response) => {
    let restaurant = request.params.id;
    let config = {
        where: {
            id: restaurant
        },
        include: [
            {
                model: Reviews,
                order: [["id", "desc"]],
                include: [Users]
            }
        ]
    }

    Restaurants.findOne(config).then(result => {
        // response.send(restaurantDetails);
        response.send(result);
    });
});

app.post('/register', (request, response) => {
    if(!request.body.name || !request.body.email || !request.body.password){
        response.status(400).send({ message: "Necesitas completar los datos" });
        return;
    }

    Users.findOne({where: {email: request.body.email}}).then(result => {
        if(result != null){
            throw "El usuario ya existe."
        }
    }).then(result => {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        return Users.create({
            name,
            email,
            password
        });
    }).then (result => {
        response.send({"result": result}).end();
    }).catch (err => {
        response.status(500).send({error: err});
    });


    
});
