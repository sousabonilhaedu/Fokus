const btnAdicionaTarefa = document.querySelector('.app__button--add-task');
const btnCancelaTarefa = document.querySelector('.app__form-footer__button--cancel');
const formAdicionaTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefa = document.querySelector('.app__section-task-list');
const tarefaAtiva = document.querySelector('.app__section-active-task-description');

const removeConcluidas = document.querySelector('#btn-remover-concluidas');
const removeTodos = document.querySelector('#btn-remover-todas');

let listaTarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizaTarefa() {
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
}

function criaElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
</svg>
        
    `
    const paragrafo = document.createElement('p');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const editaTarefa = prompt("Qual o novo nome da tarefa?");
        if(editaTarefa){
            paragrafo.textContent = editaTarefa;
            tarefa.descricao = editaTarefa;
            atualizaTarefa();
        }
        
        
    }

    const botaoImg = document.createElement('img');
    botaoImg.setAttribute('src', '/imagens/edit.png');

    botao.append(botaoImg);

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa){
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled', 'disabled');
    }   else{
        
        li.onclick = () => {
            
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(item =>{
                    item.classList.remove('app__section-task-list-item-active');
                });
            if(tarefaSelecionada == tarefa){
                tarefaAtiva.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            }
            liTarefaSelecionada = li;
            tarefaSelecionada = tarefa;    
            tarefaAtiva.textContent = tarefa.descricao;
            li.classList.add('app__section-task-list-item-active');
    
        }
    }


    return li;

}

btnAdicionaTarefa.addEventListener('click', () => {

    formAdicionaTarefa.classList.toggle('hidden');

});

btnCancelaTarefa.addEventListener('click', () => {
    textArea.value = '';
    formAdicionaTarefa.classList.toggle('hidden');
})

formAdicionaTarefa.addEventListener('submit', (event) => {
    event.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    listaTarefas.push(tarefa);
    const criaTarefaDisplay = criaElementoTarefa(tarefa);
    ulTarefa.append(criaTarefaDisplay);
    atualizaTarefa();

    textArea.value = '';
    formAdicionaTarefa.classList.add('hidden');
})

listaTarefas.forEach(tarefa => {
    const criaTarefaDisplay = criaElementoTarefa(tarefa);
    ulTarefa.append(criaTarefaDisplay);
})

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
        tarefaSelecionada.completa = true;
        atualizaTarefa();
    }
})

const removeTarefas = (somenteCompleta) =>{
    let seletor = '.app__section-task-list-item';
    
    if(somenteCompleta){
        seletor = '.app__section-task-list-item-complete'
    }

    document.querySelectorAll(seletor).forEach(elemento =>{
        elemento.remove();
    })
    if(somenteCompleta){
        
        listaTarefas = listaTarefas.filter(tarefa => !tarefa.completa);
    }
        else{
            listaTarefas = [];
        }
        
    atualizaTarefa();
    document.querySelector('.app__section-active-task-description').textContent = '';
}

removeConcluidas.onclick = () => removeTarefas(true);
removeTodos.onclick = () => removeTarefas(false);


