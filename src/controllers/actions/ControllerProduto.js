const detalhes = document.getElementsByClassName("btn-delt")
const adicionar = document.getElementsByClassName("btn-shop")
for (let i in detalhes) {
    let item = document.getElementById("btn" + i)
    if (item) {
        item.addEventListener("click", (e) => {
            let data = e.target.parentNode.parentNode.getAttribute("produto")
            if (data) {
                window.location.href = `https://www.otakushopp.com/detalhes/${data}`
            }
        })

    }
}
for (let i in adicionar) {
    let item = document.getElementById("shop" + i)
    if (item) {
        item.addEventListener("click", (e) => {
            let idProduto = e.target.parentNode.parentNode.getAttribute("produto")
            try {
                const key = localStorage.getItem('key')
                if (idProduto != "" || idProduto != undefined || idProduto || null) {
                    axios.post('https://www.api-otaku-shop.com.br/api/token', new URLSearchParams({
                        "id": `${key}`
                    }
                    )).then(({ data }) => {
                        if (data.state) {
                            axios.post('https://www.api-otaku-shop.com.br/api/addproduto', new URLSearchParams({
                                "IdUsuario": `${key}`,
                                "IdProduto": `${idProduto}`,
                                "Quant": 1,
                                "Size": null
                            })).then((response) => {
                                if (response.data.affectedRows == 1) {
                                    const Key = localStorage.getItem("key")
                                    window.location.href = `https://www.otakushopp.com/carrinho/${Key}`
                                }
                            })
                        } else {
                            window.location.href = `https://www.otakushopp.com/acesso`
                        }
                    })
                } else {
                    window.location.href = `https://www.otakushopp.com/acesso`
                }
            } catch (error) {
                console.log(error)
            }
        })

    }
}
