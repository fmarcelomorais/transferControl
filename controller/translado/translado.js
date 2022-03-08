const banco = require('../../db/conexao');
const Translado = require('../../model/Translado');
const Veiculo = require('../../model/Veiculo');
const Destino = require('../../model/Destino')

module.exports = class TransladoController {

    static async create(req, res){    

        const translado = {    
            dataSaida: req.body.data,
            turno: req.body.turno,
            veiculo: req.body.placa,
            destino: req.body.destino,
            matriculaAluno: req.body.matricula   
        }
        const sincronizar = await banco.sync();
        await Translado.create(translado);
        /* const lotado = await getVeiculo(placa)
        if (lotado.lotado) {
            try {
                console.log('Veiculo Lotado')
                /* const sincronizar = await banco.sync();
                const criarTranslado = await Translado.create(translado);
                console.log(criarTranslado)
    
            } catch (error) {
                console.log('olha o erro ' + error)
            }        
        } else {
            const sincronizar = await banco.sync();
            await Translado.create(translado);
          
            let lotacao = await getVeiculo(placa);
            
            if (lotacao.lotacao < 6) {
                let dado = await getVeiculo(placa);
                dado.lotado = true
                dado.lotacao = 0
                await dado.save()
            } else {
                let dado = await getVeiculo(placa);
                dado.lotacao -= 5
                await dado.save()
            } */
            
            res.redirect('/translado/adicionar')
    
    
    }
    
    static async readAll(req, res){
        try {
            const sincronizar = await banco.sync();
            const translados = await Translado.findAll({raw: true});
            res.render('translado/translados', {translados})
        
        } catch (error) {
            console.log(error)
        }
        //res.render('translado/translados')
    }
    
    static async readByKey(req, res){
        try {
            const sincronizar = await banco.sync();
            const translado = await Translado.findOne({
                where: { veiculo: key}
            });
            if(translado){
                console.log(`\n------TRANSLADO------\nSaida: ${translado.dataSaida}\nTurno: ${translado.turno}\nDestino: ${translado.destino}\nVeiculo: ${translado.veiculo}\nMatricula: ${translado.matriculaAluno}\n--------`);
            }else{
                console.log(`Nenhuma Solictação encontrada com essa chave: ${key}`)
            }
            return translado
        } catch (error) {
            console.log(error)
        }
    }
    
    static async updateTranslado(req, res){
        let dado = await readByKey(key);
        //dado.dataSaida = '05/15/2022';
        dado.veiculo = 'DCE-1234'
        await dado.save();    
    }
    
    static async deleteTranslado(req, res){
       const id = req.params.id
        await Translado.destroy({where: { id: id}});
        res.redirect('/translado')
    }

    static async getTranslado(req, res){
        const matricula = req.params.matricula
        const sincronizar = await banco.sync()
        const translados = await Translado.findOne({raw: true, where: {matriculaAluno: matricula}})
        res.render('translado/editar', {translados})
    }
    
    static async getLotado(req, res){
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findOne({
                where: { placa: placa}
            });            
           //console.log(veiculo)
            return veiculo
        } catch (error) {
            console.log(error)
        }
    }
    
    static async getVeiculo(req, res){
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findOne({
                where: { placa: placa}
            });            
            //console.log(veiculo)
            //res.render({veiculo})
        } catch (error) {
            console.log(error)
        }
    }
    static async getAllVeiculo(req, res){
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findAll({raw:true});            
            const destino = await Destino.findAll({raw:true});            
            //console.log(veiculo)
            //return {veiculo}
            res.render('translado/adicionar', {veiculo, destino})
        } catch (error) {
            console.log(error)
        }
    }


}




