const { DataTypes } = require('sequelize');
const banco = require('../../db/conexao');

const Usuario = require('./Usuario')

const Translado = banco.define('Translado', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataSaida:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    turno:{
        type: DataTypes.STRING,
        allowNull: false
    },
    destino:{
        type: DataTypes.STRING,
        allowNull: false
    },
    veiculo:{
        type: DataTypes.STRING,
        allowNull: false
    }/* ,
    matriculaAluno:{
        type: DataTypes.STRING,
        allowNull: false
    }, */

});

//Translado.hasOne(Usuario)





module.exports = Translado;