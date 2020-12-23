const stripHtml = require("string-strip-html");
const Task = require("../models/Task");
const Label = require('../models/Label');
const testSchema = require('../schemas/taskSchema');

async function postTask(req, res) {
    let { name } = req.body;
    try{
        if(testSchema.validate(req.body).error) res.status(422);
        name = stripHtml(name).result;
        const task = await Task.create({name});
        const taskToSend = await Task.findOne({attributes:{id: task.id}, include: Label});
        res.status(201).send(taskToSend);
    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

module.exports = {
    postTask,
}