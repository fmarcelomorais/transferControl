const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite'
});

/* try {
    sequelize.authenticate();
    console.log('Banco conectado com sucesso!');
} catch (error) {
    console.log('Erro ao conectar ao banco' + error);
} */

module.exports = sequelize;
