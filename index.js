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
    let restaurants = [
        {
            id: 1,
            name: "Restaurant " + query,
            address: "Calle falsa #1234",
            image: "/assets/breakfast3.jpg",
            rating: "3",
            last_review: {
                id: 1,
                review: "Aqui va la ultima reseña lalala blah blah",
                author: "Author review"
            }
        },
        {
            id: 2,
            name: "Another restaurant " + query,
            address: "Calle falsa #123",
            image: "/assets/breakfast3.jpg",
            rating: "4.5",
            last_review: {
                id: 2,
                review: "Aqui va la ultima resena blah blah",
                author: "Author"
            }
        }
    ];
    response.send(restaurants); 
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
                include:[Users]
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
    let restaurantDetails = {
        "id": 2,
        "name": "Another restaurant " + restaurant,
        "address": "Calle falsa #123",
        "images": ['/assets/breakfast4.jpg', '/assets/breakfast2.jpg', '/assets/breakfast5.jpg'],
        "rating": "4.5",
        "reviews": [    
            {
                "id": 2,
                "rating": "2",
                "review": "Aqui va la ultima reseña blah blah",
                "author": "Author"
            },
            {
                "id": 3,
                "rating": "3",
                "review": "Aqui va la ultima resena blah blah",
                "author": "Author"
            },
            {
                "id": 4,
                "rating": "4",
                "review": "Aqui va la ultima resena blah blah",
                "author": "Author"
            },


        ]
    }
    response.send(restaurantDetails);
})
