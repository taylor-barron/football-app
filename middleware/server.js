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

    async function getYears(client, res) {

        try {
            await client.connect();
            const years = await client.db("Years").collection("Years").find().toArray()

            res.send(years)
        } catch(e) {
            console.error(e)
        } finally {
            await client.close()
        }
    }

    getYears(client, res)
})

// Return all weeks that have data. Res is array of objects. info you want is object.name
app.post('/weeks', (req, res) => {
    const uri = process.env.MONGO_DB
    const client = new MongoClient(uri);
    year = req.body.year

    async function getWeeks(client, year, res) {

        try {
            await client.connect();
            const weeks = await client.db(year).listCollections().toArray()
            res.json(weeks)
        } catch(e) {
            console.error(e)
        } finally {
            await client.close()
        }
    }

    getWeeks(client, year, res)
})

// gets games. returns as array of objects
app.post('/games', (req, res) => {
    const uri = process.env.MONGO_DB
    const client = new MongoClient(uri);
    year = req.body.year
    week = req.body.week

    async function getGames(client, year, week, res) {

        try {
            await client.connect();
            const games = await client.db(year).collection(week).find().toArray()
            res.json(games)
        } catch(e) {
            console.error(e)
        } finally {
            await client.close()
        }
    }

    getGames(client, year, week, res)
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });