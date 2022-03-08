
const banco = require('../../db/conexao');
const Veiculo = require('../../model/Veiculo');

module.exports = class VehicleController{

    static async create(req, res){

        const veiculo = {    
            marca: req.body.marca,
            modelo: req.body.modelo,
            placa: req.body.placa,
            lotacao: req.body.lotacao,
            lotado: false,
            descricao: req.body.descricao,
        }
        try {
            const sincronizar = await banco.sync();            
            const criarVeiculo = await Veiculo.create(veiculo);
            
            res.redirect('/veiculo')
        } catch (error) {
            console.log(error)
        }
    }
    
    static async readAll(req, res){
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findAll({raw: true});
            /* veiculo.forEach(veiculo => console.log(`\n------VEICULOS------\nMarca: ${veiculo.marca}\nModelo: ${veiculo.modelo}\nPlaca: ${veiculo.placa}\nLotação: ${veiculo.lotacao}\nLotado: ${veiculo.lotado}\nDescrição: ${veiculo.descricao}\n--------`)) */
            res.render('veiculos/veiculos', {veiculo})
        } catch (error) {
            console.log(error)
        }
        //res.render('veiculos/veiculos')
    }
    
    static async readByKey(req, res){
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findOne({
                where: { placa: key}
            });
            if(veiculo){
                console.log(`------VEICULOS------\nMarca: ${veiculo.marca}\nModelo: ${veiculo.modelo}\nPlaca: ${veiculo.placa}\nLotação: ${veiculo.lotacao}\nLotado: ${veiculo.lotado}\nDescrição: ${veiculo.descricao}\n--------`);
            }else{
                console.log(`Nenhum destino encontrado com essa chave: ${key}`)
            }
            return veiculo
        } catch (error) {
            console.log(error)
        }
    }
    
    static async updateVeiculo(req, res){
      const marca = req.body.marca
      const  modelo = req.body.modelo
      const  placa = req.body.placa
      const  lotacao = req.body.lotacao
      const  lotado = false
      const  descricao = req.body.descricao
    
      const veic = {
          marca,
          modelo,
          placa,
          lotacao,
          lotado,
          descricao
      }
        await Veiculo.update(veic, {where:{ placa : placa}})
        res.redirect('/veiculo')  
    }
    
    static async deleteVeiculo(req, res){
        const placa = req.params.placa
        await Veiculo.destroy({where: {placa: placa}});
        res.redirect('/veiculo')
    }

    static async readAllVeiculo(req, res){
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findAll({raw: true});
            res.render('veiculos/editar', {veiculo})
        } catch (error) {
            console.log(error)
        }
        //res.render('veiculos/veiculos')
    }
    static async readOneVeiculo(req, res){
        const placa = req.params.placa
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findOne({raw: true, where: { placa : placa}});
            res.render('veiculos/editar', {veiculo})
        } catch (error) {
            console.log(error)
        }
        //res.render('veiculos/veiculos')
    }

}


