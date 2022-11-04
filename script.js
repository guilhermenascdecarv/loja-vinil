//Modal
const abrirModal = () => {
    document.getElementById('modal').classList.add('active')
}
const fecharModal = () => {
    limparCampos()
    document.getElementById('modal').classList.remove('active')
}


//JSON , Disco Temporário
const tDisco = {
    album: "Nu",
    artista: "Forfun",
    ano: "2015",
    selo: "Independente",
    data: "03/11/2022"
}


//Local Storage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_disco')) ?? []
const setLocalStorage = (dbDisco) => localStorage.setItem("db_disco", JSON.stringify(dbDisco))


//CRUD
//Delete
const deleteDisco = (indexDisco) => {
    const dbDisco = readDisco()
    dbDisco.splice(indexDisco, 1)
    setLocalStorage(dbDisco)
}
//Update
const updateDisco = (indexDisco, disco) => {
    const dbDisco = readDisco()
    dbDisco[indexDisco] = disco
    setLocalStorage(dbDisco)
}

//Read
const readDisco = () => getLocalStorage()

//Create
const createDisco = (disco) => {
    const dbDisco = getLocalStorage()
    dbDisco.push(disco)
    setLocalStorage(dbDisco)
}


//Interação
const camposValidos = () => {
    return document.getElementById('form').reportValidity()
}
const limparCampos = () => {
    const campos = document.querySelectorAll('.modal_input')
    campos.forEach(campo => campo.value = '')
}

const salvarDisco = () => {
    if (camposValidos()) {
        const disco = {
            album: document.getElementById('album').value,
            artista: document.getElementById('artista').value,
            ano: document.getElementById('ano_lan').value,
            selo: document.getElementById('selo').value,
            data: document.getElementById('data_loja').value
        }
        createDisco(disco)
        fecharModal()
    }
}


//Eventos
document.getElementById('cadastrar_disco').addEventListener('click', abrirModal)
document.getElementById('fechar_modal').addEventListener('click', fecharModal)

document.getElementById('salvar').addEventListener('click', salvarDisco)
document.getElementById('cancelar').addEventListener('click', fecharModal)