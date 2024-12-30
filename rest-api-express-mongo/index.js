const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
const port = process.env.PORT
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors({origin: '*'}));
const routes = require('./routes');

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
