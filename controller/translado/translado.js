const banco = require('../../db/conexao');
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
        const matriculaAluno = req.body.matricula
        
        const matriculAluno = await Usuario.findOne({
            raw: true,
            where: {
                matricula: matriculaAluno
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
                matriculaAluno,
            }
            //res.redirect('/translado/adicionar')

            const veiculo_ = await Veiculo.findOne({
                raw: true,
                where: {
                    placa: veiculo
                }
            })
            /* const sincronizar = await banco.sync();
            await Translado.create(translado); */

            if (veiculo_.lotado) {
                try {
                    console.log('veiculo_ Lotado')
                    /*  const sincronizar = await banco.sync();
                    const criarTranslado = await Translado.create(translado);
                    console.log(criarTranslado) */
                    res.redirect('/translado/adicionar')
                    //res.redirect('/translado/adicionar')
                } catch (error) {
                    console.log('olha o erro ' + error)
                }
            } else {
                const sincronizar = await banco.sync();
                await Translado.create(translado);
                
                if (veiculo_.lotacao < 1) {
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
                }
                res.redirect('/aluno')
            }
        }



    }

    static async readAll(req, res) {
        try {
            const sincronizar = await banco.sync();
            const translados = await Translado.findAll({
                raw: true
            });
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
        let dado = await readByKey(key);
        //dado.dataSaida = '05/15/2022';
        dado.veiculo = 'DCE-1234'
        await dado.save();
    }

    static async deleteTranslado(req, res) {
        const id = req.params.id
        await Translado.destroy({
            where: {
                id: id
            }
        });
        res.redirect('/translado')
    }

    static async getTranslado(req, res) {
        const matricula = req.params.matricula
        const sincronizar = await banco.sync()
        const translados = await Translado.findOne({
            raw: true,
            where: {
                matriculaAluno: matricula
            }
        })
        res.render('translado/editar', {
            translados
        })
    }

    static async getLotado(req, res) {
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findOne({
                where: {
                    placa: placa
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
            //console.log(veiculo)
            //res.render({veiculo})
        } catch (error) {
            console.log(error)
        }
    }
    static async getAllVeiculo(req, res) {
        try {
            const sincronizar = await banco.sync();
            const veiculo = await Veiculo.findAll({
                raw: true
            });
            const destino = await Destino.findAll({
                raw: true
            });
            //console.log(veiculo)
            //return {veiculo}
            res.render('translado/adicionar', {
                veiculo,
                destino
            })
        } catch (error) {
            console.log(error)
        }
    }


}