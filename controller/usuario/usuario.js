const banco = require('../../db/conexao');
const Usuario = require('../../model/Usuario');

module.exports = class UserController {
    
     static async create(req, res){

        const user = {    
            nome: req.body.nome,
            email: req.body.email,
            tipo: req.body.tipo,
            matricula: req.body.matricula,
            senha: req.body.senha
        }
        try {
            const sincronizar = await banco.sync();
    
            const criarUsuario = await Usuario.create(user);
            //console.log(criarUsuario)
            res.redirect('/usuario')
        } catch (error) {
            console.log(error)
        }

    }
    
     static async readAll(req, res){
         try {
             const sincronizar = await banco.sync();
             const usuarios = await Usuario.findAll({raw: true});
            /*  usuarios.forEach(usuario => console.log(`\n------USUARIOS------\nNome: ${usuario.nome}\nMatricula: ${usuario.matricula}\nemail: ${usuario.email}\ntipo: ${usuario.tipo}\nSenha: ${usuario.senha}\n--------\n`)) */
             res.render('usuario/usuarios', {usuarios})
            } catch (error) {
                console.log(error)
            }
    }
    
     static async readByKey(req, res){
         const matricula = req.params.matricula
        try {
            const sincronizar = await banco.sync();
            const usuarios = await Usuario.findOne({
                raw: true,  where: { matricula: matricula}
            });
            if(usuarios){
               /*  console.log(`------USUARIOS------\nNome: ${usuarios.nome}\nMatricula: ${usuarios.matricula}\nemail: ${usuarios.email}\ntipo: ${usuarios.tipo}\nSenha: ${usuarios.senha}\n--------\n`); */
            }else{
                console.log(`Nenhum usuario encontrado com essa chave: ${matricula}`)
            }
            return usuarios
        } catch (error) {
            console.log(error)
        }
    }
    
     static async alterar(req, res){
        const id = req.body.id
        const nome = req.body.nome
        const email = req.body.email
        const tipo = req.body.tipo
        const matricula = req.body.matricula
        const senha = req.body.senha

        const user = {  
            id, 
            nome,
            email,
            tipo,
            matricula,
            senha
        }
        await Usuario.update(user, {where: {matricula: matricula}}); 
        //await user.save()
        res.redirect('/usuario')   
    }

    static async getDados(req, res){
        const matricula = req.params.matricula
        const usuario = await Usuario.findOne({raw: true, where:{ matricula : matricula}})

        res.render('usuario/editar', {usuario})
    }
    
     static async deleteUser(req, res){
        const matricula = req.params.matricula       
        await Usuario.destroy({where: { matricula: matricula}});
        res.redirect('/usuario')
    }
    
    
}