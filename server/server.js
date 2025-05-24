import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const url = process.env.DATABASE_URL;
console.log("the data base url is ", process.env.DATABASE_URL);
const client = new MongoClient(url);
const dbname = "Pass_build";
let collection;
async function connectDB() {
    try {
        await client.connect();
           const db =  client.db(dbname);
     collection =  db.collection('passwords');
        console.log("connected to mongo db");
    } catch (err) {
        console.log("Failed to connect to db", err);
    }
}
connectDB();

app.get('/', async (req, res) => {
    try {
      
        const findResult = await collection.find({}).toArray();
        console.log("the fine result is " , findResult);
        res.json(findResult);
    } catch (err) {
        res.status(500).send("Internal server Error\n");
    }
})

app.post('/submit', async (req, res) => {
    const pass = req.body;
    try {
      
        await collection.insertOne(pass);
        console.log("handle of post request check", pass);
      res.json({ message: "Success: data received" });

    } catch (err) {
         console.log("error in fetching the data post request",err);
        res.status(500).send("Internal server error at post request\n");
    }
})
app.delete('/', async (req, res) => {
    try {
     
        const pass = req.body;
        await collection.deleteOne(pass)
        res.json({message : "successfully deleted"});
    } catch(err) {
         console.log("error in fetching the datain the delete request",err);
        res.status(500).send("Internal server error at delete request\n");
    }
})

app.listen(port, () => {
    console.log(`server is running at the port ${port}`);
})

