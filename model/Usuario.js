const { DataTypes } = require('sequelize');
const banco = require('../db/conexao');
const Translado = require('./Translado')

const Usuario = banco.define('Usuario', {
    /* id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        //primaryKey: true
    }, */
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    matricula:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    }

});

Usuario.hasMany(Translado, {
    constraint: true, 
    allowNull: false,
    foreignKey: 'matricula'
} )
Translado.belongsTo(Usuario)

module.exports = Usuario;