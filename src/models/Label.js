const { Sequelize } = require('sequelize');
const sequelize = require('../database/index');

class Label extends Sequelize.Model{

}

const attributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
};

const options = {
    sequelize,
    timestamps: false,
    modelName: 'label'
}

Label.init(attributes, options);

module.exports = Label;