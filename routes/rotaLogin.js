const rota = require("express").Router();

const login = require('../controller/login/loginController')

rota.post('/login', login.login)
rota.get('/logout', login.logout)


module.exports = rota