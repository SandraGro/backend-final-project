const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

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
    if (!request.body.name || !request.body.email || !request.body.password) {
        response.status(400).send({ message: "Necesitas completar los datos" });
        return;
    }

    Users.findOne({ where: { email: request.body.email } }).then(result => {
        if (result != null) {
            throw "El usuario ya existe."
        }
    }).then(() => {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        return Users.create({
            name,
            email,
            password
        });
    }).then(result => {
        claimUser = {
            name: result.name,
            email: result.email,
            id: result.idS
        }
        const token = jwt.sign(claimUser, 'secretKey', { expiresIn: '24h' });
        response.send({ "result": result, "token": token }).end();
    }).catch(err => {
        response.status(500).send({ error: err });
    });
});

app.post('/login', (request, response) => {
    console.log('generando token')
    //Paso 1.-verificar que el usuario exista en la tabla de cuentas
    Users.findOne({
        where: {
            email: request.body.email,
            password: request.body.password
        }
    }).then((resp) => {
        console.log(resp)
        if (!resp) {
            response.status(401).send({ message: "Usuario o contraseña incorrectos" })
        } else {
            claimUser = {
                name: resp.name,
                email: resp.email,
                id: resp.id
            }
            const token = jwt.sign(claimUser, 'secretKey', { expiresIn: '24h' });
            console.log(token);
            response.send({
                token: token
            });
        }
    });
});

app.post('/review', (request, response) => {
    if (!request.body.review || !request.body.rating || !request.body.restaurantId) {
        response.status(400).send({ message: "No hay review" })
    }

    let review = request.body.review;
    let rating = request.body.rating;
    let restaurantId = request.body.restaurantId;
    let userId = 2;

    Reviews.create({
        review,
        rating,
        restaurantId,
        userId,
    })
        .then(data => {
            response.send(data);
        });
});

app.delete('/review/:id', (request, response) => {
    Reviews.destroy({
        where: {
            id: request.params.id
        }
    }).then(data => {
        response.send(null);
    });
});

app.patch('/review/:id', (request, response) => {
    Reviews.update(
        {
            review: request.body.review,
            rating: request.body.rating
        },
        {
            where: {
                id: request.params.id
            }
        }).then(data => {
            console.log('Actualizado');
            response.send(null);
        });
});