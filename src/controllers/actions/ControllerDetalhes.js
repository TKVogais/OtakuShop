AdicionarProduto()

function AdicionarProduto() {
    try {
        const BtnAdicionarProduto = document.getElementById('add-carrinho')
        if (BtnAdicionarProduto) {
            const Select = document.getElementById('size-option')
            let Tamanho
            const idProduto = BtnAdicionarProduto.getAttribute("name")
            BtnAdicionarProduto.addEventListener("click", () => {
                try {
                    Tamanho = Select.options[Select.selectedIndex].text
                } catch (error) {
                    Tamanho = 'null'
                }
                const Quantidade = document.getElementById('product-qtde').value
                if (Tamanho != "Selecione o tamanho") {
                    try {
                        const key = localStorage.getItem('key')
                        if (key) {
                            if (idProduto != "" || idProduto != undefined || idProduto || null) {
                                axios.post('https://www.api-otaku-shop.com.br/api/token', new URLSearchParams({
                                    "id": `${key}`
                                })).then(({
                                    data
                                }) => {
                                    if (data.state) {
                                        axios.post('https://www.api-otaku-shop.com.br/api/addproduto', new URLSearchParams({
                                            "IdUsuario": `${key}`,
                                            "IdProduto": `${idProduto}`,
                                            "Quant": `${Quantidade}`,
                                            "Size": `${Tamanho}`
                                        })).then((response) => {
                                            const Key = localStorage.getItem("key")
                                            window.location.href = `https://www.otakushopp.com/carrinho/${Key}`
                                        })
                                    } else {
                                        window.location.href = `https://www.otakushopp.com/acesso`
                                    }
                                })
                            } else {
                                window.location.href = `https://www.otakushopp.com/acesso`
                            }
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}