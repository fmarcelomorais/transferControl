const { DataTypes } = require('sequelize');
const banco = require('../db/conexao');

const Veiculo = banco.define('Veiculo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    marca:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    placa:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lotacao:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lotado:{
        type: DataTypes.BOOLEAN, // 0 false - 1 true
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull: false
    },
    


});

module.exports = Veiculo;