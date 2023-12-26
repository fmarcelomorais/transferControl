const rota = require('express').Router();

rota.get('/', (req, res)=>{
    res.render('home')
})
rota.get('/admin', (req, res)=>{
    res.render('dashboardAdmin')
})
rota.get('/aluno', (req, res)=>{
    res.render('dashboardAluno')
})

module.exports = rota