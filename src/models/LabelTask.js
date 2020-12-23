const { Sequelize } = require('sequelize');
const sequelize = require('../database/index');

class LabelTask extends Sequelize.Model{

}

const attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    taskId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    labelId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
};

const options = {
    sequelize,
    timestamps: false,
    modelName: 'labelTask'
}

LabelTask.init(attributes, options);

module.exports = LabelTask;