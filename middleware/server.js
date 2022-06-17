const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const { mongoose, MongoClient } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_CLIENT
const client = new MongoClient(uri);

//--------------------------------------------- GETs ------------------------------------------------//


app.get('/', (req, res) => {
    res.send("hi")
})
app.listen(4000)