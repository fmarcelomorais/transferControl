const rotaVeiculo = require("express").Router();
const veiculos = require('../controller/veiculo/veiculo')

rotaVeiculo.get('/adicionar', (req, res) => { res.render('veiculos/adicionar')})
rotaVeiculo.post('/add', veiculos.create)
rotaVeiculo.get('/', veiculos.readAll)
rotaVeiculo.get('/editar/:placa', veiculos.readOneVeiculo)
rotaVeiculo.post('/edite', veiculos.updateVeiculo)
rotaVeiculo.post('/delete/:placa', veiculos.deleteVeiculo)

module.exports = rotaVeiculo
