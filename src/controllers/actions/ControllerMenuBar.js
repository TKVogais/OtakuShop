const BtnHome = document.getElementById('menu-home')
const BtnProdutos = document.getElementById('menu-produtos')
const BtnPerfil = document.getElementById('menu-perfil')
const BtnCarrinho = document.getElementById('menu-carrinho')
const BtnHomeB = document.getElementById('menu-home-b')
const BtnProdutosB = document.getElementById('menu-produtos-b')
const BtnPerfilB = document.getElementById('menu-perfil-b')
const BtnCarrinhoB = document.getElementById('menu-carrinho-b')

if (BtnHome) {
    BtnHome.addEventListener("click", () => {
        window.location.replace("https://www.otakushopp.com/")
    })
    BtnProdutos.addEventListener("click", () => {
        window.location.href = "https://www.otakushopp.com/produtos"
    })
    BtnPerfil.addEventListener("click", () => {
        let Key = localStorage.getItem("key")
        window.location.href = `https://www.otakushopp.com/perfil/${Key}`
    })
    BtnCarrinho.addEventListener("click", () => {
        let Key = localStorage.getItem("key")
        window.location.href = `https://www.otakushopp.com/carrinho/${Key}`
    })
    BtnHomeB.addEventListener("click", () => {
        window.location.replace("https://www.otakushopp.com")
    })
    BtnProdutosB.addEventListener("click", () => {
        window.location.href = "https://www.otakushopp.com/produtos"
    })
    BtnPerfilB.addEventListener("click", () => {
        let Key = localStorage.getItem("key")
        window.location.href = `https://www.otakushopp.com/perfil/${Key}`
    })
    BtnCarrinhoB.addEventListener("click", () => {
        let Key = localStorage.getItem("key")
        window.location.href = `https://www.otakushopp.com/carrinho/${Key}`
    })
}