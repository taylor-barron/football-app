const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const { mongoose, MongoClient } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_DB
const client = new MongoClient(uri);

//--------------------------------------------- GETs ------------------------------------------------//

// Return all years that have data
app.get('/years', (req, res) => {
    const uri = process.env.MONGO_DB
    const client = new MongoClient(uri);

    async function getYears(client) {

        try {
            await client.connect();
            const years = await client.db("Years").collection("Years").find().toArray()
            console.log(years)
            res.json(years);
        } catch(e) {
            console.error(e)
        } finally {
            await client.close()
        }
    }

    getYears(client)
})

app.listen(4000)