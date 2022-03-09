const express = require('express');
const exphbs = require('express-handlebars')
const app = express();

// TEMPLATE ENGINE
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')


app.use(express.static('public'))

// CONEXÃO COM BANCO
const conexao = require('./db/conexao');
//conexao.sync({force: true}) // limpa o banco

// ROTAS
const rotaLogin = require('./routes/rotaLogin')
const rotaInicial = require('./routes/rotaInicial')
const rotasUsuario = require('./routes/usuarioRouter')
const rotasVeiculo = require('./routes/veiculosRouter')
const rotasDestino = require('./routes/destinosRouter')
const rotasTranslado = require('./routes/transladosRouter')


// RECEBER DADOS ATRAVÉS DE REQUISIÇÃO
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// MIDDLEWARE uso das rotas
//Rota de usuarios
app.use('/', rotaLogin)
app.use('/', rotaInicial)
app.use('/usuario', rotasUsuario)
app.use('/veiculo', rotasVeiculo)
app.use('/destino', rotasDestino)
app.use('/translado', rotasTranslado)



// SERVIDOR LOCAL
app.listen(3000, () =>{
    try {
        conexao.authenticate();
        console.log('Banco conectado com sucesso!');
    } catch (error) {
        console.log('Erro ao conectar ao banco' + error);
    }
    console.log('Servidor rodando na porta: 3000.')
});
