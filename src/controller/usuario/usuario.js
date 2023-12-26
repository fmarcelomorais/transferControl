const banco = require('../../../db/conexao');
const Usuario = require('../../model/Usuario');
const bcrypt = require('bcrypt')

module.exports = class UserController {

    static async create(req, res) {

        const {
            nome,
            email,
            tipo,
            matricula,
            senha
        } = req.body 


        try {

            const emailExistis = await Usuario.findOne({
                raw: true,
                where: {
                    email: email
                }
            })
            const matriculaExistis = await Usuario.findOne({
                raw: true,
                where: {
                    matricula: matricula
                }
            })

            if (emailExistis || matriculaExistis) {
                req.flash('userRegistred', 'Usuário já Cadastrado! Email ou Matricula em uso.')
                res.render('usuario/adicionar')
                return
            } else {

                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(senha, salt)

                const user = {
                    nome,
                    email,
                    tipo,
                    matricula,
                    senha: hashedPassword
                }
                await banco.sync();
                const newUser = await Usuario.create(user);
                if (newUser) {
                    req.flash('userRegister', 'Usuário Cadastrado com Sucesso!')

                    res.render('usuario/adicionar')
                    return
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    static async readAll(req, res) {
        try {
            const sincronizar = await banco.sync();
            const usuarios = await Usuario.findAll({
                raw: true
            });

            res.render('usuario/usuarios', {
                usuarios
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async readByMatricula(req, res) {

        const matricula = req.body.matricula


        try {
            const sincronizar = await banco.sync();
            const usuarios = await Usuario.findAll({
                raw: true,
                where: {
                    matricula: matricula
                }
            });

            if (!usuarios || usuarios.length == 0) {
                
                req.flash('userNot', 'Usuário não econtrado.')
                res.render('usuario/usuario', {
                    usuarios
                })
                return
            } else if (usuarios) {
                //req.flash('userYes', 'Usuário econtrado.', usuarios[0].nome)
                res.render('usuario/usuario', {
                    usuarios
                })

            }


        } catch (error) {
            console.log(error)
        }

    }

    static async alterar(req, res) {
        const id = req.body.id
        const nome = req.body.nome
        const email = req.body.email
        const tipo = req.body.tipo
        const matricula = req.body.matricula
        const senha = req.body.senha

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha, salt)

        const user = {
            id,
            nome,
            email,
            tipo,
            matricula,
            senha: hashedPassword
        }
        await Usuario.update(user, {
            where: {
                matricula: matricula
            }
        });
        req.flash('userEdite', 'Usúario Editado.')
        res.redirect('/usuario')
    }

    static async getDados(req, res) {
        const matricula = req.params.matricula
        const usuario = await Usuario.findOne({
            raw: true,
            where: {
                matricula: matricula
            }
        })

        res.render('usuario/editar', {
            usuario
        })
    }

    static async deleteUser(req, res) {
        const matricula = req.params.matricula
        await Usuario.destroy({
            where: {
                matricula: matricula
            }
        });
        //req.flash('userDeleted', 'Usúario Deletado com Sucesso.')
        res.redirect('/usuario')
    }


}