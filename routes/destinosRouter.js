const rota = require('express').Router();

const destinos = require('../controller/destino/destino');

rota.get('/adicionar', (req, res) => { res.render('destinos/adicionar')})
rota.post('/add', destinos.create);
rota.get('/', destinos.readAll);
rota.get('/editar/:sigla', destinos.getDestino)
rota.post('/editar', destinos.updateDestino)
rota.post('/delete/:id', destinos.deleteDest)

module.exports = rota