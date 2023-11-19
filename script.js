const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaInput = document.querySelector('#alternar-musica');
const startPause = document.querySelector('#start-pause');
const pause = document.querySelector('#start-pause span');
const temporizador = document.querySelector('#timer');

const overtimeSound = new Audio('/sons/nice.mp3');
const pauseSound = new Audio('/sons/pause.mp3');
const playSound = new Audio('/sons/play.mp3');
const musica = new Audio('/sons/fontaine theme.mp3');
musica.loop = true;

let tempoDecorrido = 1500;
let intervaloId = null;


musicaInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }   else{
        musica.pause();
    }

})

focoButton.addEventListener('click', () => {
    tempoDecorrido = 1500;
    alteraContexto('foco');
    focoButton.classList.add('active');
})

curtoButton.addEventListener('click', () => {
    tempoDecorrido = 300;
    alteraContexto('descanso-curto');
    curtoButton.classList.add('active');
})

longoButton.addEventListener('click', () => {
    tempoDecorrido = 900;
    alteraContexto('descanso-longo');
    longoButton.classList.add('active');
})

function alteraContexto(contexto){
    
    mostraTempo();
    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `/imagens/${contexto}.png`);

    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    switch (contexto) {
        case "foco": 
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>` 
            
            break;

        case "descanso-curto": 
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            
            break;
        
        case "descanso-longo": 
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    
        
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0) {
        overtimeSound.play();
        alert('temporizador zerado! pode descansar meu jovem guerreiro.');
        zerar();
        return;
    }
    tempoDecorrido -= 1;
    mostraTempo();
}

startPause.addEventListener('click', iniciaPausa);


function iniciaPausa() {
    if(intervaloId){
        pauseSound.play();
        zerar();
        return
    }
    playSound.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    pause.textContent = "Pausar";
}

function zerar(){
    clearInterval(intervaloId);
    pause.textContent = "Começar"
    intervaloId = null;
}

function mostraTempo(){
    const timer = new Date(tempoDecorrido * 1000);
    const timerFormatado = timer.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${timerFormatado}`;
}

mostraTempo();