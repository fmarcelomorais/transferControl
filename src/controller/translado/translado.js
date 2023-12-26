const banco = require('../../../db/conexao');
const Translado = require('../../model/Translado');
const Veiculo = require('../../model/Veiculo');
const Destino = require('../../model/Destino')
const Usuario = require('../../model/Usuario')

module.exports = class TransladoController {

    static async create(req, res) {

        const dataSaida = req.body.data
        const turno = req.body.turno
        const destino = req.body.destino
        const veiculo = req.body.placa
        const matricula = req.body.matricula

        const veiculos = await Veiculo.findAll({
            raw: true
        });
        const destinos = await Destino.findAll({
            raw: true
        });
                
        const matriculAluno = await Usuario.findOne({
            raw: true,
            where: {
                matricula: matricula
            }
        })

        if (!matriculAluno) {
            req.flash('matriculaInexistente', 'Este Numero de Matricula não está Cadastrado')
            res.render('translado/adicionar', {
                destinos,
                veiculos
            })
        }

        const translateExists = await Translado.findOne({
             raw: true,
            where:{
                dataSaida: dataSaida,
                turno: turno,
                destino: destino,
                veiculo: veiculo,
                matricula: matricula
            }
        })
        
        if(translateExists){
            console.log(translateExists)
            req.flash('translateRegistred', 'Turno, Veiculo e Destino já Solicitado para esse Aluno.')
            res.render('translado/adicionar', {
                destinos,
                veiculos
            })
            return
            
        }

            try {
                const translado = {
                    dataSaida,
                    turno,
                    veiculo,
                    destino,
                    matricula,
                    UsuarioMatricula: matricula
                    
                }
    
                    // cadastra o translado
                    await banco.sync();
                    await Translado.create(translado);
                    req.flash('translateRegiter', 'Solicitação Registrada com Sucesso..')
                    res.render('translado/adicionar', {
                        destinos,
                        veiculos
                    })
                  
                    const veiculo_ = await Veiculo.findOne({
                        raw: true,
                        where: {
                            placa: veiculo
                        }
                    })
    
                    if (veiculo_.lotacao <= 1) {
    
                        veiculo_.lotado = true
                        await Veiculo.update(veiculo_, {
                            where: {
                                placa: veiculo
                            }
                        })
                        veiculo_.lotacao = 0
                        await Veiculo.update(veiculo_, {
                            where: {
                                placa: veiculo
                            }
                        })
    
                    } else {
                        veiculo_.lotacao -= 1
                        await Veiculo.update(veiculo_, {
                            where: {
                                placa: veiculo
                            }
                        })
                    }
    
                    //res.redirect('/aluno')
                                    
                    
                } catch (error) {
                    console.log(error)
                }
        
        


















        /* const matriculAluno = await Usuario.findOne({
            raw: true,
            where: {
                matricula: matricula
            }
        })
        if (!matriculAluno) {
            res.redirect('/translado/adicionar')
            //res.end()
        } else {
            console.log('valido')

            const translado = {
                dataSaida,
                turno,
                veiculo,
                destino,
                matricula,
                UsuarioMatricula: matricula
            }
            





            const veiculo_ = await Veiculo.findOne({
                raw: true,
                where: {
                    placa: veiculo
                }
            })
            

            if (veiculo_.lotado) {
                try {
                    console.log('veiculo_ Lotado')

                    res.redirect('/translado/adicionar')
                 
                } catch (error) {
                    console.log('olha o erro ' + error)
                }
            } else {

                await banco.sync();
                await Translado.create(translado);

                if (veiculo_.lotacao <= 1) {

                    veiculo_.lotado = true
                    await Veiculo.update(veiculo_, {
                        where: {
                            placa: veiculo
                        }
                    })
                    veiculo_.lotacao = 0
                    await Veiculo.update(veiculo_, {
                        where: {
                            placa: veiculo
                        }
                    })

                    res.redirect('/aluno')
                } else {
                    veiculo_.lotacao -= 1
                    await Veiculo.update(veiculo_, {
                        where: {
                            placa: veiculo
                        }
                    })
                    res.redirect('/aluno')
                }
            }
        } */



    }

    static async readAll(req, res) {
        try {
            const sincronizar = await banco.sync();
            const translados = await Translado.findAll({
               raw: true
            });
            //const user = await Usuario.findOne({where: { }})
            res.render('translado/translados', {
                translados
            })

        } catch (error) {
            console.log(error)
        }
        //res.render('translado/translados')
    }

    static async readByKey(req, res) {
        try {
            const sincronizar = await banco.sync();
            const translado = await Translado.findOne({
                where: {
                    veiculo: key
                }
            });
            if (translado) {
                console.log(`\n------TRANSLADO------\nSaida: ${translado.dataSaida}\nTurno: ${translado.turno}\nDestino: ${translado.destino}\nVeiculo: ${translado.veiculo}\nMatricula: ${translado.matriculaAluno}\n--------`);
            } else {
                console.log(`Nenhuma Solictação encontrada com essa chave: ${key}`)
            }
            return translado
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTranslado(req, res) {
        const id = req.body.id
        const dataSaida = req.body.data
        const turno = req.body.turno
        const placa = req.body.placa
        const destino = req.body.destino
        const matricula = req.body.matricula

        const translado = {
            id,
            dataSaida,
            turno,
            placa,
            destino,
            matricula
        }
        await Translado.update(translado, {
            where: {
                matricula: matricula
            }
        });
        //await user.save()
        res.redirect('/translado')
    }

    static async deleteTranslado(req, res) {
        const id = req.params['id']
        const placa = req.params['placa']
       

        // exclui o translado
        await Translado.destroy({
              where: {
                  id: id
              }
          }); 

        // retorna lotação
        const veiculo = await Veiculo.findOne({
            where: {
                placa: placa
            }
        })

        veiculo.lotacao += 1
        await veiculo.save()

        const veiculoL = await Veiculo.findOne({
            where: {
                placa: placa
            }
        })
        veiculoL.lotado = false
        await veiculoL.save()

        res.redirect('/translado')
    }

    static async getTranslado(req, res) {
        const matricula = req.params.matricula
        await banco.sync()
        const translados = await Translado.findOne({
            raw: true,
            where: {
                matricula: matricula
            }
        })
        const veiculo = await Veiculo.findAll({
            raw: true
        });
        const destino = await Destino.findAll({
            raw: true
        });
        res.render('translado/editar', {
            translados,
            destino,
            veiculo
        })
    }

    static async getLotado(req, res) {
        const id = req.params.id
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findOne({
                where: {
                    id: id
                }
            });
            //console.log(veiculo)
            return veiculo
        } catch (error) {
            console.log(error)
        }
    }

    static async getVeiculo(req, res) {
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findOne({
                where: {
                    placa: placa
                }
            });
            return veiculo
            //console.log(veiculo)
            //res.render({veiculo})
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllVeiculo(req, res) {
        try {
            const sincronizar = await banco.sync();
            const veiculos = await Veiculo.findAll({
                raw: true
            });
            const destinos = await Destino.findAll({
                raw: true
            });
            //console.log(veiculo)
            //return {veiculo}
            res.render('translado/adicionar', {
                veiculos,
                destinos
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async alunoTransladado(req, res){
        const matricula = req.params.matricula

        const aluno = await Usuario.findAll({ raw: true,  where: { matricula: matricula}})

        res.render('translado/alunoTranslado', {aluno})
        console.log(aluno)
    }


}