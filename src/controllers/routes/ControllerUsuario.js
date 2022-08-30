const axios = require('axios').default
const url = process.env.NODE_URL_API
const acesso = async (req, res) => {
    res.render('acesso', { layout: 'acesso', title: "Acesso" })
}
const verificaToken = async (req, res, next) => {
    const key = req.params.key

    try {
        if (key != "" || key != undefined || key || null) {
            axios.post(url + '/api/token', new URLSearchParams({
                "id": `${key}`
            }
            )).then(({ data }) => {
                if (data.state) {
                    next()
                } else {
                    res.redirect("/acesso")
                }
            })
        } else {
            res.redirect("/acesso")
        }
    } catch (error) {
        res.redirect("/acesso")
    }
}

module.exports = {
    acesso,
    verificaToken
}