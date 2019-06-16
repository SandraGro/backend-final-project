const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log('server running'))

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

