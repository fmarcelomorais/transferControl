const rota = require('express').Router();
const translado = require('../controller/translado/translado');


rota.get('/adicionar', translado.getAllVeiculo)
rota.post('/add', translado.create)
rota.get('/', translado.readAll)
rota.get('/editar/:matricula', translado.getTranslado)
rota.post('/edite', translado.updateTranslado)
rota.post('/delete/:id/:placa', translado.deleteTranslado)
rota.get('/verificar/:matricula', translado.alunoTransladado)


module.exports = rota;