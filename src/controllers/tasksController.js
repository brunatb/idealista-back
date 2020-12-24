const stripHtml = require("string-strip-html");
const Task = require("../models/Task");
const Label = require('../models/Label');
const { testSchema, testUpdateSchema }  = require('../schemas/taskSchema');

async function postTask(req, res) {
    let { name } = req.body;
    try{
        if(testSchema.validate(req.body).error) return res.sendStatus(422);
        name = stripHtml(name).result;
        const task = await Task.create({name});
        const taskToSend = await Task.findOne({attributes:{id: task.id}, include: Label});
        res.status(201).send(taskToSend);
    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

async function getAllTasks(req,res) {
    try{
        const tasks = await Task.findAll({include: Label});
        res.status(200).send(tasks);
    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

async function updateTask(req, res) {
    const { name, isChecked } = req.body;
    const { id } = req.params;
    try{
        if(testUpdateSchema.validate(req.body).error) return res.sendStatus(422);
        const task = await Task.findByPk(id);
        if(task === null) return res.sendStatus(404);

        if(name) task.name;
        if(isChecked) task.isChecked = isChecked;

        task.save();

        res.status(200).send(task)

    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

async function deleteTask(req, res){
    const { id } = req.params;
    try{
        if(testUpdateSchema.validate(req.body).error) return res.sendStatus(422);
        const task = await Task.findByPk(id);
        if(task === null) return res.sendStatus(404);

        task.destroy();

        res.sendStatus(200);

    }catch(err){
        res.sendStatus(500);
        console.log(err);
    }
}

module.exports = {
    postTask,
    getAllTasks,
    updateTask,
    deleteTask
}