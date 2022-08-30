let alter = false
AlterarFotoPerfil()
Logout()
BuscarInformacoesComCep()
EventoInputTelefone()
AtualizarPerfil()


function AlterarFotoPerfil() {
    const img = document.querySelector('[name=file]')
    if (img) {
        img.addEventListener('change', e => {
            let file = e.target.files[0]
            let fileReader = new FileReader()
            fileReader.onloadend = () => {
                document.querySelector('#image').setAttribute('src', fileReader.result)
            }
            fileReader.readAsDataURL(file)
            alter = true
        })
    }
}


function Logout() {
    const BtnLogout = document.getElementById("logout")
    if (BtnLogout) {
        BtnLogout.addEventListener('click', () => {
            const key = localStorage.getItem('key')
            axios.post('https://www.api-otaku-shop.com.br/api/logout', new URLSearchParams({
                'id': key,
            })).then((response) => {
                window.location.replace("https://www.otakushopp.com")
            }).catch((error) => {
                console.log(error)
            });
        })
    }
}

function BuscarInformacoesComCep() {
    const Cep = document.getElementById('cep')
    const Load = document.getElementById('load-perfil')
    if (Cep) {
        Cep.addEventListener('keypress', () => {
            if (Cep.value.length == 5) {
                Cep.value += "-"
            }
        })
        Cep.addEventListener('focusout', () => {
            try {
                if (Cep.value.length === 9) {
                    Load.style.display = "flex";
                    axios.get(`https://viacep.com.br/ws/${Cep.value}/json/`).then((response) => {
                        const auto = document.getElementsByClassName('auto');
                        for (let i = 0; i < auto.length; i++) {
                            switch (auto[i].name) {
                                case 'estado':
                                    auto[i].value = response.data.uf
                                    break;
                                case 'cidade':
                                    auto[i].value = response.data.localidade
                                    break;
                                case 'bairro':
                                    auto[i].value = response.data.bairro
                                    break;
                                case 'rua':
                                    auto[i].value = response.data.logradouro
                                    break;
                            }
                        }
                        setTimeout(()=>{
                            Load.style.display = "none"
                        }, 1200)
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            } catch (error) {

            }
        })
    }
}

function EventoInputTelefone() {
    const Telefone = document.getElementById('telefone')
    if (Telefone) {
        Telefone.addEventListener('keypress', () => {
            switch (Telefone.value.length) {
                case 2:
                    let string = Telefone.value.replace(/[^a-zA-Z0-9]/g, '')
                    Telefone.value = "(" + string + ") "
                    break;
                case 6:
                    Telefone.value += " "
                    break;
                case 11:
                    Telefone.value += "-"
                    break;
            }
        })
    }
}

function AtualizarPerfil() {
    const BtnPerfil = document.getElementById('save-perfil')
    const DivLoad = document.getElementById('content-load')
    const DivButton = document.getElementById('content-button')

    if (BtnPerfil) {
        BtnPerfil.addEventListener('click', async () => {
            let location = ""
            const { nome, usuario, email, nascimento, telefone, cep, estado, cidade, bairro, rua, numero, complemento } = document.getElementsByClassName('input-perfil');
            let Image = document.querySelector('[name=file]')
            if (alter) {
                let formData = new FormData()
                formData.append('image', Image.files[0])
                formData.append('Usuario', usuario.value)
                const Path = await axios.post('https://www.otakushopp.com/upload-perfil', formData).then(({ data }) => {
                    return data
                }).catch((error) => {
                    console.log(error)
                })
                location = Path.location
            }

            DivLoad.style.display = "flex"
            DivButton.style.display = "none"
            const key = localStorage.getItem('key')
            axios.post('https://www.api-otaku-shop.com.br/api/atualizar', {
                Path: location,
                Nome: nome.value,
                Email: email.value,
                Nascimento: nascimento.value,
                Telefone: telefone.value,
                Cep: cep.value,
                Estado: estado.value,
                Cidade: cidade.value,
                Rua: rua.value,
                Bairro: bairro.value,
                Numero: numero.value,
                Complemento: complemento.value,
                Id: key
            }).then(({ data }) => {
                const Alert = document.getElementById('notificacao-' + data.state)
                setTimeout(() => {
                    DivLoad.style.display = "none"
                    Alert.style.display = "flex"
                })
                setTimeout(() => {
                    Alert.style.display = "none"
                    DivButton.style.display = "flex"
                }, 2000, 1000)
            }).catch((error) => {
                console.log(error)
            });
        })
    }
}