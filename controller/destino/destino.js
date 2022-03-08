const banco = require('../../db/conexao');
const Destino = require('../../model/Destino');

module.exports = class DestinoController {

    static async create(req, res){
        const nome = req.body.nome
        const sigla = req.body.sigla
        const destino = {                
            nome,
            sigla
        }
        try {
            const sincronizar = await banco.sync();
            //console.log(sincronizar)    
            await Destino.create(destino);
            res.redirect('/destino')
            //console.log(criarDestino)
        } catch (error) {
            console.log(error)
        }
    }
    
    static async readAll(req, res){
        try {
            const sincronizar = await banco.sync();
            const destinos = await Destino.findAll({raw:true});
            /* destino.forEach(destino => console.log(`------DADOS------\nNome: ${destino.nome}\nSigla: ${destino.sigla}\n--------`)) */
            res.render('destinos/destinos', {destinos})
            
        } catch (error) {
            console.log(error)
        }
        
        //res.render('destinos/destinos')
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




//create(destino)
//readAll()
//readByKey('CE')
//update('12345')
//deleteUser('123')
