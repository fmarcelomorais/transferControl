
const banco = require('../../db/conexao');
const Veiculo = require('../../model/Veiculo');

module.exports = class VehicleController{

    static async create(req, res){

        const  {    
            marca,
            modelo,
            placa,
            lotacao,
            lotado,
            descricao
        } = req.body

      

        const veiculos = await Veiculo.findOne({
            raw: true,
            where: {
                placa: placa
            }
        })

        if(veiculos){
            req.flash('carRegistred', 'Placa já Cadastrada para outro veiculo')
            res.render('veiculos/adicionar', {veiculos})
            return
            console.log(veiculos)
        }
        
        const veiculo ={
            marca,
            modelo,
            placa,
            lotacao,
            lotado: false,
            descricao
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
            await banco.sync();
            const veiculo = await Veiculo.findAll({raw: true});
            res.render('veiculos/veiculos', {veiculo})
        } catch (error) {
            console.log(error)
        }
        
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
      const id = req.body.id 
      const marca = req.body.marca
      const  modelo = req.body.modelo
      const  placa = req.body.placa
      const  lotacao = req.body.lotacao
      const  lotado = false
      const  descricao = req.body.descricao
    
      const veic = {
          id,
          marca,
          modelo,
          placa,
          lotacao,
          lotado,
          descricao
      }
        await Veiculo.update(veic, {where:{ id : id}})
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


