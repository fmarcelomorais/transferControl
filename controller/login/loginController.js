const banco = require('../../db/conexao');
const Usuario = require('../../model/Usuario');

module.exports = class LoginController {

    static async login(req, res){
        const {email, senha} = req.body
        const usuario = await Usuario.findOne({where: {email: email, senha: senha}})
        if(!usuario){
            //console.log('não encontrado')
            res.redirect('/')
            return
        }
        if(usuario.tipo === 'aluno'){
            //console.log(usuario.tipo)
            res.redirect('/aluno')   
             
        }else if(usuario.tipo === 'admin'){
            res.redirect('/admin') 
          
        }

    }
}

