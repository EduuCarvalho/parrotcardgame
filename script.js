//let baralho=document.querySelector(".baralho");


//function comecarJogo(){

 
    //let entradaDeCartas=prompt("Selecione um número de cartas entre 4 e 14!!!");
    //while (entradaDeCartas%2!==0 || entradaDeCartas<4 || entradaDeCartas>14){
    //entradaDeCartas=prompt("Favor selecionar um número par entre 4 e 14. Com quantas cartas você quer jogar?")

   // }
//}
  
//puxar classe tabuleiro pra uma const
const tabuleiro = document.querySelector('.tabuleiro');
const timer = document.querySelector('.timer');

//Criar Array contendo todos os tipos de cartas(figuras)
const tiposDeCartas = [
    'bobrossparrot' ,
    'explodyparrot' ,
    'fiestaparrot' ,
    'metalparrot' ,
    'revertitparrot' ,
    'tripletsparrot' ,
    'unicornparrot' ,
];

// fução que cria divs para cada carta que entrar no jogo
const criarElemento = (tag, classeCarta) => {

    const elemento = document.createElement(tag);
    elemento.className = classeCarta;
    return elemento;
}

let primeiraCarta = "";
let segundaCarta = "";

//Aqui eu verifico se o ser vivo acertou ou errou, ou seja.... Se carta 1 = carta Acertou.... Se nao... Errou
const verificarPares = () => {
    const primeiraFigura = primeiraCarta.getAttribute('data-figura');
    const segundaFigura = segundaCarta.getAttribute('data-figura');

    if (primeiraFigura === segundaFigura){
            
            primeiraCarta.classList.add('cartaCerta');
            segundaCarta.classList.add('cartaCerta');
           
            primeiraCarta = '';
            segundaCarta = '';
            cartasCertas++;
            numeroDeClicks++;
        checarFimDoJogo();

    } else { 

        setTimeout(() =>{
            primeiraCarta.classList.remove('revelarCarta');
            segundaCarta.classList.remove('revelarCarta');

            primeiraCarta = '';
            segundaCarta = '';
        },1000)

            numeroDeClicks++;
        }
}
let numeroDeClicks = 0;
let cartasCertas = 0;

//Verificar fim do jogo.
const checarFimDoJogo = () =>{
    
    
    if (cartasCertas === entradaDeCartas/2){
        clearInterval(this.loop);
       alert (`Você ganhou em ${(numeroDeClicks*2)} jogadas!Seu tempo foi ${timer.innerHTML} segundos. Deseja jogar novamente?`);
           
        }
      
    
}


//Criar uma função que vira essa carta puxando a classe revelar
const revelarCarta = ({target}) =>{

    if(target.parentNode.className.includes('revelarCarta')){
        return;
    }

    if (primeiraCarta == ""){
        target.parentNode.classList.add ('revelarCarta');
        primeiraCarta = target.parentNode;
    } else if (segundaCarta == ""){
        target.parentNode.classList.add('revelarCarta');
        segundaCarta = target.parentNode;

        verificarPares();
    }



}


//função que atribui classes para as cartas criadas
    const criarCarta = (figura) => {
    const carta = criarElemento('div', 'carta');
    const frente = criarElemento ('div', 'face frente')
    const costas = criarElemento ('div', 'face costas');

    frente.style.backgroundImage = `url('./imagens/${figura}.gif')`;

    tabuleiro.appendChild(carta);
    carta.appendChild (frente);
    carta.appendChild (costas);

    carta.addEventListener('click',revelarCarta);

    carta.setAttribute('data-figura',figura)

   return carta;

}


let entradaDeCartas;

//função que carrega o jogo, duplica a array para gerar os pares, embaralha de forma aleatória
function loadGame () {
    entradaDeCartas=prompt("Selecione um número de cartas entre 4 e 14!!!");
    while (entradaDeCartas%2!==0 || entradaDeCartas<4 || entradaDeCartas>14){
    entradaDeCartas=prompt("Favor selecionar um número par entre 4 e 14. Com quantas cartas você quer jogar?")

}

let primeiraFiguras = tiposDeCartas.slice(0,(entradaDeCartas/2));
let segundaFiguras = tiposDeCartas.slice(0,(entradaDeCartas/2));
let duplicarFigura = [...primeiraFiguras,...segundaFiguras];

    const embaralharArray = duplicarFigura.sort(() => Math.random()-0.5);

    
    embaralharArray.forEach ((figura) =>{
        
        const carta = criarCarta(figura);
        tabuleiro.appendChild(carta);

    })
    
}
const comecarTempo = () =>{

    this.loop = setInterval(()=>{
        const tempoAtual= Number(timer.innerHTML);
        timer.innerHTML = tempoAtual +1;
    },1000);
    
}
//rodas função com todas as cartas criadas, dobradas e de forma aleatória
window.onload = () =>{
    comecarTempo();
    loadGame();

}






