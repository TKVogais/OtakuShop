window.onload = () => {
    EventoBotaoTamanhos()
    EventoBotaoTamanho()
    EventoBotaoLimparCarrinho()
    EventoBotaoRedirecionaProdutos()
    EventoBotaoDeletaProduto()
    EventoBotaoResgateCupom()
    EventoDeletaCarrinho()
    EventoBotoesAlteraQuantProduto()
    EventoAtualizarTotal()
}

let datacupom = {}
let vfrete = 0;

const EventoBotaoTamanhos = async () => {
    const {
        urlApi,
        urlHost
    } = await axios.get('http://localhost:8081/url').then(({
        data
    }) => {
        return data
    })
    const Btns = document.getElementsByClassName('btn_size');
    for (let i = 0; i < Btns.length; i++) {
        let text = ''
        let id = -1
        Btns[i].id = "btn_size" + i
        document.getElementById('btn_size' + i).addEventListener("click", (e) => {
            text = e.target.textContent
            const key = localStorage.getItem('key')
            id = e.target.parentNode.parentNode.parentNode.getAttribute("name")
            let idProduto = e.target.parentNode.parentNode.parentNode.getAttribute("mob")
            document.getElementById("Size" + id).textContent = text
            document.getElementById("btns" + id).style.display = "none"
            axios.post(urlApi + '/api/tamanho', new URLSearchParams({
                'idUsuario': key,
                'idProduto': idProduto,
                'size': text.trim()
            })).then((response) => {

            }).catch((error) => {
                console.log(error)
            });
        })
    }
}
const EventoBotaoTamanho = () => {
    const boxSize = document.getElementsByClassName('click-size');
    for (let i = 0; i < boxSize.length; i++) {
        let id = boxSize[i].parentNode.id
        let btn = document.getElementById('div-size' + id)
        if (btn != null) {
            btn.addEventListener('click', (e) => {
                let btns = document.getElementById('btns' + id)
                if (btns.style.display == "flex") {
                    btns.style.display = "none"
                } else {
                    btns.style.display = "flex"
                }
            })
        }
    }
}
const EventoBotaoLimparCarrinho = () => {
    const BtnFinalizaCompra = document.getElementById('fCompra')
    if (BtnFinalizaCompra) {
        BtnFinalizaCompra.addEventListener('click', () => {
            limparCarrinho()
        })
    }
}
const EventoBotaoRedirecionaProdutos = async () => {
    const {
        urlHost
    } = await axios.get('http://localhost:8081/url').then(({
        data
    }) => {
        return data
    })
    const BtnRedirecionaProdutos = document.getElementById('mais-produtos')
    if (BtnRedirecionaProdutos) {
        BtnRedirecionaProdutos.addEventListener('click', () => {
            window.location.href = urlHost + "/produtos";
        })
    }
}

const EventoBotaoDeletaProduto = () => {
    const Btns = document.getElementsByClassName('delete-btn')
    for (let i = 0; i < Btns.length; i++) {
        document.getElementById("delete" + i).addEventListener("click", function (e) {
            let idProduto = e.target.getAttribute("mob")
            let id = this.parentNode.parentNode.parentNode.children[2].children[0].id
            deletaProduto(e.target.id[this.id.length - 1], idProduto)
            atualizarSubTotalGeral();
            atualizarTotalGeral();
        })
    }
}
const EventoAtualizarTotal = () => {
    const totais = document.getElementsByClassName("total-span")
    const SpanTotal = document.getElementById('span-total')
    const lenght = totais.length
    let total = 0
    for (let i = 0; i < lenght; i++) {
        total += parseFloat(totais[i].textContent.replace(".", "").replace(",", ".").trim().substring(9, totais[i].lenght).trim())
        console.log(total)
    }
    SpanTotal.textContent = "Total: R$ " + (total).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
// const EventoCalculoFrete = () => {
//     const BtnCalcularFrete = document.getElementById("calcep")
//     const LoadFrete = document.getElementById('load-frete')
//     BtnCalcularFrete.addEventListener("click", () => {
//         let cep = document.getElementById('inpfrete').value
//         let remetente = {};
//         document.getElementById('inpfrete').value = "";
//         LoadFrete.style.display = "block";
//         if (!cep == "") {
//             axios.get(`https://viacep.com.br/ws/47970-000/json/`).then(response => {
//                 remetente = response.data
//             })
//             axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => {
//                 if (response.data.hasOwnProperty('erro')) {
//                     setarMensagem('status-frete', "Cep Inválido")
//                 } else {
//                     setTimeout(() => {
//                         LoadFrete.style.display = "none"
//                         if (remetente.localidade === response.data.localidade) {
//                             atualizarFrete({
//                                 valor: 10,
//                                 prazoEntrega: 2
//                             })
//                         } else {
//                             vfrete = response.data.valor
//                             atualizarFrete({
//                                 valor: 30,
//                                 prazoEntrega: 12
//                             })
//                         }
//                         atualizarTotalGeral();
//                     }, 1200)
//                 }
//             }).catch((error) => {
//                 console.log(error);
//             });
//         }
//     })
// }
const EventoBotaoResgateCupom = () => {
    const BtnResgateCupom = document.getElementById("btn_resgatar")
    const LoadCupom = document.getElementById('load-cupom')
    if (BtnResgateCupom) {
        BtnResgateCupom.addEventListener("click", () => {
            let cupom = document.getElementById('inpcup').value
            if (cupom) {
                LoadCupom.style.display = "block"
                try {
                    axios.post('https://www.api-otaku-shop.com.br/api/cupom', new URLSearchParams({
                        'cupom': `${cupom}`
                    })).then(({
                        data
                    }) => {
                        setTimeout(() => {
                            LoadCupom.style.display = "none"
                            datacupom = data
                            if (data.State == 200) {
                                atualizaCupom(data)
                                atualizarSubTotalGeral();
                                atualizarTotalGeral();
                            }
                            setarMensagem('status-cupom', data.Message)
                        }, 1200)
                    }).catch((error) => {
                        console.log(error)
                    });
                } catch (error) {

                }
            }
        })
    }
}
const deletaProduto = (id, idProduto) => {
    removerProduto(idProduto)
    let elemento = document.querySelector("#prod" + id)
    elemento.parentNode.removeChild(elemento);
    let carrinho = document.getElementsByClassName('produto')
    if (carrinho.length === 0) {
        limparCarrinho()
    }
    EventoAtualizarTotal()
}
const EventoDeletaCarrinho = () => {
    const BtnDeletarCarrinho = document.getElementById('delete-all')
    BtnDeletarCarrinho.addEventListener("click", () => {
        limparCarrinho()
    })
}
const EventoBotoesAlteraQuantProduto = async () => {
    const btn_down = document.getElementsByClassName('down');
    for (let i = 0; i < btn_down.length; i++) {
        let loads = document.getElementsByClassName('load-event')
        let buttons = document.getElementsByClassName('alter-btn')
        document.getElementById("down" + i).addEventListener("click", async (e) => {
            console.log("cliquei ")
            let id = 0
            if (e) {
                id = e.target.parentNode.parentNode.children[0].id
            }
            let loads = document.getElementsByClassName('load-event')
            let buttons = document.getElementsByClassName('alter-btn')
            let idProduto = e.target.getAttribute("name")
            let span = document.getElementById("span" + id)

            if (parseInt(span.textContent) > 1) {
                span.textContent = parseInt(span.textContent) - 1
                atualizarSubTotalProduto(id, parseInt(span.textContent))
                loads[id].style.display = "inline-block"
                buttons[id].style.display = "none"
                const key = localStorage.getItem('key')
                await axios.post('https://www.api-otaku-shop.com.br/api/quantidade', new URLSearchParams({
                    'idUsuario': key,
                    'idProduto': idProduto,
                    'quant': -1
                })).then(({
                    data
                }) => {
                    setTimeout(() => {
                        loads[id].style.display = "none"
                        buttons[id].style.display = "flex"
                    }, 200)
                }).catch((error) => {
                    console.log(error)
                });
            } else {
                deletaProduto(id, idProduto)
            }
        })
        document.getElementById("up" + i).addEventListener("click", async (e) => {
            let id = 0
            if (e) {
                id = e.target.parentNode.parentNode.children[0].id
            }
            let idProduto = e.target.getAttribute("name")
            loads[id].style.display = "inline-block"
            buttons[id].style.display = "none"
            const key = localStorage.getItem('key')
            await axios.post('https://www.api-otaku-shop.com.br/api/quantidade', new URLSearchParams({
                'idUsuario': key,
                'idProduto': idProduto,
                'quant': 1
            })).then(({
                data
            }) => {
                setTimeout(() => {
                    loads[id].style.display = "none"
                    buttons[id].style.display = "flex"
                }, 200)
            }).catch((error) => {
                console.log(error)
            });
            let span = document.getElementById("span" + id)
            span.textContent = parseInt(span.textContent) + 1
            atualizarSubTotalProduto(id, parseInt(span.textContent))
        })
    }
}
const atualizarSubTotalProduto = (id, qtde) => {
    let pr = document.getElementById("preco" + id)
    total = document.getElementById("total" + id)
    let valorUnitario = parseFloat(pr.textContent.replace(",", ".").trim().substring(9, pr.length).trim()) * qtde
    total.textContent = "Total: R$ " + (valorUnitario).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    EventoAtualizarTotal()
}
const atualizarSubTotalGeral = () => {
    let totalprodutos = document.getElementById("pr")
    let spans = document.getElementsByClassName('spantotal');
    let total = 0;
    for (let i = 0; i < spans.length; i++) {
        total += parseFloat(spans[i]
            .textContent
            .replace(".", "")
            .replace(",", ".")
            .trim()
            .substr(2, spans[i].length)
        )
    }
    totalprodutos.textContent = "R$" + (total).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
const atualizarTotalGeral = () => {
    atualizaCupom(datacupom)
    let valores = document.getElementsByClassName('calc-total');
    let totalgeral = document.getElementById('totg')
    let total = 0
    for (let i = 0; i < valores.length; i++) {
        total += parseFloat(valores[i]
            .textContent
            .replace(".", "")
            .replace(",", ".")
            .trim()
            .substr(2, valores[i].length)
        )
    }
    totalgeral.textContent = "R$" + (total).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
const atualizaCupom = ({
    State,
    Categoria,
    Valor,
    Tipo,
    Message
}) => {
    switch (Categoria) {
        case "PRODUTOS":
            CupomProdutos(Valor, Tipo)
            break;
        case "FRETE":
            break;
    }
}

const CupomProdutos = (valor, Tipo) => {
    const PrecoProdutos = document.getElementById("pr")
    let total = parseFloat(PrecoProdutos.textContent
        .replace(".", "")
        .replace(",", ".")
        .trim().substr(2, PrecoProdutos.length))
    switch (Tipo) {
        case "VALOR":
            CupomDinheiro(total, valor)
            break;

        case "PERCENTUAL":
            CupomPercentual(total, valor)
            break;
    }
}

const CupomFrete = () => {

}

const CupomPercentual = (total, percentual) => {
    let valor = total - (total * (100 - percentual) / 100)
    let cupons = document.getElementById('cup')
    cupons.textContent = "R$ " + (valor * -1).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

const CupomDinheiro = (total, valor) => {
    let cupons = document.getElementById('cup')
    cupons.textContent = "R$ " + ((total - valor) * -1).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
const setarMensagem = (Span, message) => {
    let span = document.getElementById(Span)
    span.textContent = message
    span.style.display = "block"
    setTimeout(() => {
        span.style.display = "none"
    }, 3000)
}
const descontarDinheiro = (valor) => {
    let cupons = document.getElementById('cup')
    cupons.textContent = "R$ " + (valor * -1).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
const descontarPorcentagem = (valor) => {
    let cupons = document.getElementById('cup')
    let valores = document.getElementsByClassName('calc-total');
    let total = 0;
    for (let i = 0; i < valores.length - 1; i++) {
        total += parseFloat(valores[i]
            .textContent
            .replace(".", "")
            .replace(",", ".")
            .trim()
            .substr(2, valores[i].length)
        )
    }
    total *= valor / 100
    cupons.textContent = "R$ " + (total * -1).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
const atualizarFrete = (data) => {
    document.getElementById('sedex').style.display = "block"
    document.getElementById('prazo-frete').textContent = " - em até " + data.prazoEntrega + " dias úteis"
    vfrete = data.valor
    document.getElementById('preco-frete').textContent = "R$ " + (data.valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

const removerProduto = (idProduto) => {
    const key = localStorage.getItem('key')
    axios.post('https://www.api-otaku-shop.com.br/api/remover-produto', new URLSearchParams({
        'idUsuario': key,
        'idProduto': idProduto
    })).then((response) => {

    }).catch((error) => {
        console.log(error)
    });
}
const limparCarrinho = () => {
    const key = localStorage.getItem('key')
    axios.post('https://www.api-otaku-shop.com.br/api/limpar-carrinho', new URLSearchParams({
        'idUsuario': key
    })).then((response) => {
        setTimeout(() => {
            const Key = localStorage.getItem("key")
            window.location.href = `http://localhost:8081/carrinho/${Key}`;
        }, 300)
    }).catch((error) => {
        console.log(error)
    });
}