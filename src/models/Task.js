const { Sequelize } = require('sequelize');
const sequelize = require('../database/index');
const LabelTask = require('./LabelTask');
const Label = require('./Label');

class Task extends Sequelize.Model{

}

const attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isChecked: {
        type: Sequelize.BOOLEAN,
        defaulValue: '0',
    } ,
};

const options = {
    sequelize,
    timestamps: false,
    modelName: 'task'
}

Task.init(attributes, options);

Task.belongsToMany(Label, {through: LabelTask});

module.exports = Task;