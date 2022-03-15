const { raw } = require('express');
const banco = require('../../db/conexao');
const Usuario = require('../../model/Usuario');

module.exports = class LoginController {

    static async login(req, res){
        const {email, senha} = req.body
        const usuario = await Usuario.findOne({raw: true, where: {email: email, senha: senha}})
        if(!usuario){
            req.flash('userInvalido', 'Usuário ou Senha invalido!')
            res.render('home')
            return
        }
        if(usuario.tipo === 'aluno'){
            const usuario = await Usuario.findOne({raw: true, where: {email: email, senha: senha}})
            const nome = usuario.nome
            res.redirect('/aluno')   
             
        }else if(usuario.tipo === 'admin'){
            const usuario = await Usuario.findOne({raw: true, where: {email: email, senha: senha}})
            const nome = usuario.nome
            res.redirect('/admin') 
          
        }

    }
}

