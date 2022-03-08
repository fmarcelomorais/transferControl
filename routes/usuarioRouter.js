const rota = require('express').Router();

const usuario = require('../controller/usuario/usuario')

rota.get('/adicionar', (req, res) => { res.render('usuario/adicionar')})
rota.post('/add', usuario.create)
rota.get('/', usuario.readAll)
rota.get('/editar/:matricula', usuario.getDados)
rota.post('/edite', usuario.alterar)
rota.post('/delete/:matricula', usuario.deleteUser)


module.exports = rota;