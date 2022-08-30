require('dotenv').config()
const axios = require('axios').default
const url = process.env.NODE_URL_API
const urlhost = process.env.NODE_URL_HOST
const { uploadFile } = require('../../middlewares/s3')

const buscarPerfil = async (req, res) => {
    const key = req.params.key

    axios.post(url + "/api/perfil", { id: key }).then(
        ({ data }) => {
            if (data.Path == "" || data.Path == null || data.Path == undefined) {
                data.Path = "/images/avatar/default.png"
            }
            res.render('perfil', {
                title: "Perfil",
                perfil: data,
                layout: 'perfil'
            })
        }
    )
}

const atualizarPerfil = async (req, res) => {
    let file = null
    if (req.file) {
        try {
            file = RenameFile(req.file, req.body.Usuario)
        } catch (error) {
            res.json({
                state: 401,
                message: "Falha ao atualizar o peril!",
                error: error
            })
        }
        const response = await uploadFile(file)
        res.json({
            state: 200,
            message: "Perfil Atualizado com sucesso!",
            location: response.Location
        })
    } else {
        res.json({
            state: 401,
            message: "Falha ao atualizar o peril!"
        })
    }
}
const RenameFile = (file, usuario) => {
    let filename = ''
    filename = usuario + ".jpeg"
    file.filename = filename
    file.originalname = filename
    return file
}

module.exports = { buscarPerfil, atualizarPerfil }