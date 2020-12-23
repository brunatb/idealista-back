require("dotenv").config();
const express = require("express");
const cors = require("cors");

const tasksController = require('./controllers/tasksController');

const app = express();

app.use(cors());
app.use(express.json());



app.post('/tasks', tasksController.postTask);







module.exports = app;
