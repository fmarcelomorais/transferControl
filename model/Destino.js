const { DataTypes } = require('sequelize');
const banco = require('../db/conexao');

const Destino = banco.define('Destino', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    sigla:{
        type: DataTypes.STRING,
        allowNull: false
    },

});

module.exports = Destino;