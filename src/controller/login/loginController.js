const bcrypt = require('bcrypt')
const banco = require('../../../db/conexao')
const Usuario = require('../../model/Usuario');

module.exports = class LoginController {

    static async login(req, res){
        const {email, senha} = req.body
        const usuario = await Usuario.findOne({raw: true, where: {email: email}})
        req.session.userMatricula = usuario.matricula
        if(!usuario){
            req.flash('userInvalido', 'Email invalido!')
            res.render('home')
            return
        }
        const passwordMatch = bcrypt.compareSync(senha, usuario.senha)
        if(!passwordMatch){
            req.flash('userInvalido', 'Senha invalida!')
            res.render('home')
            return
        }
        if(usuario.tipo === 'aluno'){
            const usuario = await Usuario.findOne({raw: true, where: {email: email}})
           
            req.session.save(() => {
                
                res.redirect('/aluno')   
            })
             
        }else if(usuario.tipo === 'admin'){
            const usuario = await Usuario.findOne({raw: true, where: {email: email, senha: senha}})
            
            req.session.save(() => {
             
            res.redirect('/admin') 
                
            })
          
        }

    }

    static async logout(req, res){
        req.session.destroy(null)
        res.redirect('/')
    }
}

