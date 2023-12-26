const express = require('express');
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
require('dotenv').config();


const app = express();
const moment = require('moment')

// TEMPLATE ENGINE

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            moment.locale('pt-br');
            return moment(date).format('L')
        },
        formatPlaca: (placa) => {
            const placaFormatada = placa.replace(/(\d{3})?(\d{4})/, "$1-$2")      
            return placaFormatada      
        }
    }
}))

app.set('view engine', 'handlebars')
app.set('views', 'src/views/')


app.use(express.static('public'))

// CONEXÃO COM BANCO
const conexao = require('./db/conexao');
//conexao.sync({force: true}) // limpa o banco

// ROTAS
const rotaLogin = require('./src/routes/rotaLogin')
const rotaInicial = require('./src/routes/rotaInicial')
const rotasUsuario = require('./src/routes/usuarioRouter')
const rotasVeiculo = require('./src/routes/veiculosRouter')
const rotasDestino = require('./src/routes/destinosRouter')
const rotasTranslado = require('./src/routes/transladosRouter')

// Session middleware
app.use(session({
    name: "session",
    secret: "marcelomorais",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').resolve(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000)
    }
}))

// flash message
app.use(flash())

// set session to res

app.use((req, res, next) => {
    if(req.session.userMatricula){
        res.locals.session = req.session
    }

    next()
})


// RECEBER DADOS ATRAVÉS DE REQUISIÇÃO
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// MIDDLEWARE uso das rotas

app.use('/', rotaLogin)
app.use('/', rotaInicial)
app.use('/usuario', rotasUsuario)
app.use('/veiculo', rotasVeiculo)
app.use('/destino', rotasDestino)
app.use('/translado', rotasTranslado)



// SERVIDOR LOCAL
app.listen(process.env.PORT, () =>{
    try {
        conexao.authenticate();
        console.log('Banco conectado com sucesso!');
    } catch (error) {
        console.log('Erro ao conectar ao banco' + error);
    }
    console.log(`Servidor rodando na porta: ${process.env.PORT}.`)
});
