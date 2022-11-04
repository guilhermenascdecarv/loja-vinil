//Modal
const abrirModal = () => {
    document.getElementById('modal').classList.add('active')
}
const fecharModal = () => {
    limparCampos()
    document.getElementById('modal').classList.remove('active')
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
        const indexDisco = document.getElementById('album').dataset.indexDisco
        if (indexDisco == "novo") {
            createDisco(disco)
            atualizarTabela()
            fecharModal()
        } else {
            updateDisco(indexDisco, disco)
            atualizarTabela()
            fecharModal()
        }
        
    }
}

const criarLinha = (disco, indexDisco,) => {
    const novaLinha = document.createElement('tr')
    novaLinha.innerHTML = `
        <td>${disco.album}</td>
        <td>${disco.artista}</td>
        <td>${disco.ano}</td>
        <td>${disco.selo}</td>
        <td>${disco.data}</td>
        
        <td>
            <button type="button" class="button_cadastro" id="editar-${indexDisco}">Editar</button>
            <button type="button" class="button_cadastro red" id="deletar-${indexDisco}">Excluir</button>
        </td>
    
    `
    document.querySelector('#tabelaDiscos>tbody').appendChild(novaLinha)
}

const limparTabela = () => {
    const linhas = document.querySelectorAll('#tabelaDiscos>tbody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const preencherCampos = (disco) => {
    document.getElementById('album').value = disco.album
    document.getElementById('artista').value = disco.artista
    document.getElementById('ano_lan').value = disco.ano
    document.getElementById('selo').value = disco.selo
    document.getElementById('data_loja').value = disco.data
    document.getElementById('album').dataset.indexDisco = disco.indexDisco
}
const editarDisco = (indexDisco) => {
    const disco = readDisco()[indexDisco]
    disco.indexDisco = indexDisco
    preencherCampos(disco)
    abrirModal()
}
const editarDeletar = (event) => {
    if (event.target.type == 'button') {
        const [action, indexDisco]  = event.target.id.split('-')

        if (action == 'editar') {
        editarDisco(indexDisco)
        } else {    
            const disco = readDisco()[indexDisco]
            const aviso = confirm (`Deseja realmente deletar o disco ${disco.album}?`)
            if (aviso) {
                deleteDisco(indexDisco)
                atualizarTabela()
            }
        }
    }
}

const atualizarTabela = () => {
    const dbDisco = readDisco()
    limparTabela()
    dbDisco.forEach(criarLinha)
}
atualizarTabela()

//Eventos
document.getElementById('cadastrar_disco').addEventListener('click', abrirModal)
document.getElementById('fechar_modal').addEventListener('click', fecharModal)

document.getElementById('salvar').addEventListener('click', salvarDisco)
document.getElementById('cancelar').addEventListener('click', fecharModal)

document.querySelector('#tabelaDiscos>tbody').addEventListener('click', editarDeletar)