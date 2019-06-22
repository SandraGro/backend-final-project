const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log('server running'))

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
    let category = request.params.category
    let restaurants = [
        {
            id: 1,
            name: "Restaurant " + category,
            address: "Calle falsa #1234",
            image: "/assets/breakfast3.jpg",
            rating: "4.5",
            last_review: {
                id: 1,
                review: "Aqui va la ultima reseña lalala blah blah",
                author: "Author review"
            }
        },
        {
            id: 2,
            name: "Another restaurant " + category,
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

app.get('/categories', (request, response) => {
    let categories = [
        {
            id: 1,
            title: "Breakfast",
            image: "/assets/breakfast2.jpg",
            path: "breakfast"
        },
        {
            id: 2,
            title: "Lunch",
            image: "/assets/lunch1.jpg",
            path: "lunch"

        },
        {
            id: 3,
            title: "Dinner",
            image: "/assets/dinner1.jpeg",
            path: "dinner"
        },
        {
            id: 4,
            title: "Dessert",
            image: "/assets/dessert3.jpg",
            path: "dessert"
        }
    ]
    response.send(categories);
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
