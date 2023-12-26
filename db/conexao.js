const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.CONECTION_STRING);

/* try {
    sequelize.authenticate();
    console.log('Banco conectado com sucesso!');
} catch (error) {
    console.log('Erro ao conectar ao banco' + error);
} */

module.exports = sequelize;
