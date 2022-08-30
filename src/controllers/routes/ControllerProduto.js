require('dotenv').config()
const axios = require('axios').default
const url = process.env.NODE_URL_API

const buscarDestaques = async (req, res) => {
    axios.get(url + "/api/destaques").then((response) => {
        res.render('home', { destaques: response.data.results, title: "Otaku Shop" })
    })
}
const buscarDetalhes = async (req, res) => {
    axios.post(url + "/api/detalhes", new URLSearchParams({
        'id': `${req.params.id}`
    })).then((response) => {
        console.log(response.data)
        res.render('detalhes', { detalhes: response.data, title: "Detalhes" })
    }).catch((error) => {
        console.log(error)
    });
}

const buscarProdutos = (req, res) => {
    axios.get(url + "/api/produtos").then((response) => {
        res.render('produtos', { produtos: response.data, title: "Produtos" })
    })
}

const health = (req, res)=>{
    res.json({
        state: 200
    })
}
module.exports = { buscarDestaques, buscarDetalhes, buscarProdutos, health }
