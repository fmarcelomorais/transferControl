const rota = require("express").Router();

const login = require('../controller/login/loginController')

rota.post('/login', login.login)


module.exports = rota