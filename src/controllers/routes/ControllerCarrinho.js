require('dotenv').config()
const axios = require('axios').default
const url = process.env.NODE_URL_API
const urlhost = process.env.NODE_URL_HOST

const buscarCarrinho = async (req, res) => {
    const key = req.params.key
    axios.post(url + "/api/carrinho", { id: key }).then(
        (response) => {
            res.render('carrinho', {
                title: "Carrinho",
                carrinho: response.data,    
                layout: 'carrinho'
            })
        }
    )
}


module.exports = { buscarCarrinho }