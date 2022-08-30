//Carregando Módulos

const express = require("express");
const cors = require('cors')
const app = express();
const path = require('path')
const Handlebars = require('handlebars');

//Configurações

app.use(express.static(path.join(__dirname, "src")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors)
    next();
})



const port = process.env.PORT || 8081
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');
Handlebars.registerHelper('MaiorQue', (value1, value2) => {
    if (value1 > value2) {
        return `<strong><span class="preco-p">Status: Em estoque</span></strong>`
    } else {
        return `<strong><span class="preco-p">Status: Produto Indisponível</span></strong>`
    }
});

//Carregando Rotas

const RouteCarrinho = require('./src/routes/Carrinho')
const RouteUsuario = require('./src/routes/Usuario')
const RouteData = require('./src/routes/Data')
const RouteProdutos = require('./src/routes/Produtos')
const RoutePerfil = require('./src/routes/Perfil')

//Configurando Rotas

app.use('/', RouteCarrinho)
app.use('/', RouteData)
app.use('/', RouteUsuario)
app.use('/', RouteProdutos)
app.use('/', RoutePerfil)

//Iniciando o Servidor

app.listen(port, () => {
    console.log("Rodando servidor na porta " + port);
})