const banco = require('../../../db/conexao');
const Destino = require('../../model/Destino');
const moment = require('moment')

module.exports = class DestinoController {

    static async create(req, res){


        const nome = req.body.nome
        const sigla = req.body.sigla

        const destino = {                
            nome,
            sigla
        }

        const cidadeCadastrada = await Destino.findOne({
            raw: true,
            where: {nome: nome}
        })

        if(cidadeCadastrada){
            req.flash('cidadeCadastrada', 'Uma cidade já foi cadastrada com esse nome.')
            res.render('destinos/adicionar')
            return
        }
        try {

            await banco.sync();             
            await Destino.create(destino);
            req.flash('cidadeCadastradaSucesso', 'Destino Cadastrado com Sucesso.')
            res.render('destinos/adicionar')
           
        } catch (error) {
            console.log(error)
        }
    }
    
    static async readAll(req, res){
        try {
            const sincronizar = await banco.sync();
            const destinos = await Destino.findAll({raw:true});
            res.render('destinos/destinos', {destinos})
            
        } catch (error) {
            console.log(error)
        }
        

    }
    
    static async readByKey(req, res){
        const sigla = req.params.sigla
        try {
            const sincronizar = await banco.sync();
            const destino = await Destino.findOne({
                where: { sigla: sigla}
            });
                    
            return destino
        } catch (error) {
            console.log(error)
        }
    }
    
    static async updateDestino(req, res){
        const id = req.body.id
        const nome = req.body.nome
        const sigla = req.body.sigla

        const destino = {  
            id,  
            nome,
            sigla
        }

        await Destino.update(destino, {where: {id:id}})

        res.redirect('/destino')
         
    }
    static async getDestino(req, res){
        const sigla = req.params.sigla
       const destino = await Destino.findOne({raw: true, where: { sigla: sigla}}) 

       res.render('destinos/editar', {destino})
    }
    
    static async deleteDest(req, res){
        const id = req.params.id       
        await Destino.destroy({where: {id: id}});
        res.redirect('/destino')
    }
}

