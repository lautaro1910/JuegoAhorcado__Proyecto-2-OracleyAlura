//funcion auxiliar de replaceAt
String.prototype.replaceAt = function(index, character) { 
    return this.substr(0, index) + character + this.substr(index+character.length);
}

//letiables
//banco de palabras
let bancoPalabras = [
    'Trebol', 'Protesta', 'Frasco', 'Familia', 'Dinero', 'Ajedrez', 'Ciencia', 'Academia',
    'Crayon', 'Tigre', 'Palmera', 'Orden', 'Capitan', 'Reina', 'Retroalimentacion', 'Inversion', 'Mueble',
    'Caos', 'Tela', 'Descubrimiento', 'Hallazgo', 'Montaña', 'Portero', 'Criatura', 'Cuarto', 'Mantenimiento',
    'Seguridad', 'Bodega', 'Actor', 'Matematicas', 'Cancion', 'Silla', 'Hermano', 'Control', 'Prioridad', 'Emocion',
    'Gloria', 'Vela', 'Mancha', 'Tierra', 'Conejo', 'Fuego', 'Niño', 'Electrodomestico', 'Dedo', 'Personalidad', 'Huevo',
    'Disco', 'Sueter', 'Jirafa', 'Vista', 'Vuelo', 'Posicion', 'Nube', 'Apio', 'Secretaria', 'Crimen', 'Cuenca',
    'Rama', 'Arena', 'Hijo', 'Sombra', 'Peso', 'Sistema', 'Politica', 'Equipo', 'Guante', 'Vaca', 'Ensalada','Manzana', 'Policia', 
    'Pera', 'Obelisco', 'Alura', 'Oracle', 'Tiburon', 'Boton', 'Futbol', 'Bicicleta', 'Computadora', 'Programacion', 'Cohete', 'Tranquilidad', 
    'Jardin', 'Flamenco', 'Guerra', 'Civilizacion', 'Futbol', 'Baloncesto', 'Triangulo', 'Dolor', 'Perro','Nacion', 'Paraiso', 'Doctor', 'Cuello',
    'Mejilla', 'Analisis', 'Angulo', 'Cielo', 'Empleo', 'Alambre',
    'Cebo', 'Estallido', 'Casa', 'Tension', 'Organizacion', 'Servilleta', 'Accion', 'Experiencia', 'Martillo',
    'Extraño', 'Tormenta', 'Lluvia'
];

//BOTONES
//var boton evaluar letra
let evLetra = document.querySelector("#evLetra");
//boton volver
let botonVolver = document.querySelector("#botonVolver");
let botonVolverPerdiste = document.querySelector("#botonVolverPerdiste");
let botonVolverGanaste = document.querySelector("#botonVolverGanaste")
//boton iniciar juego
let iniciarGame = document.querySelector("#iniciarJuego");

//VARIABLES
//var p outPut
let pOutput = document.querySelector("#outPut");
//cantidad de vidas
let vidas = 4;
//contador de fallos del usuario
let contadorFallos = 0;

//letra usada variables
let letrasUsadasArray = [];
let letrasUsadas = document.querySelector("#letrasUsadas");

let letraYaUsada = document.querySelector("#letraYaUsada");

//palabra random elegida y sustitucion con guiones
let palabraElegida = pickRandomWord();
let palabraConGuiones = palabraElegida.replace(/./g, "_ ");

//MENSAHES
let mensajeGanador = document.querySelector("#ganador");
let mensajePerdedor = document.querySelector("#perdedor");

//CONSTANTES
const mensajeErrorInputLetra = document.querySelector("#mensajeErrorInputLetra");
const patron = new RegExp('^[A-Z]$', 's');

//inputLetra
let inputToValidate = document.querySelector("#inputLetra");

//FUNCIUONES
//funcion para que todas mis palabras esten en mayusculas
function toUpperCasePalabras() {
  for(let i = 0; i < bancoPalabras.length; i++){
    bancoPalabras[i] = bancoPalabras[i].toUpperCase();
  }
}

//funcion que me elige una palabra random de mi banco de palabras
function pickRandomWord() {
    let wordPicked = bancoPalabras[Math.floor(Math.random() * bancoPalabras.length)];
    return wordPicked.toUpperCase();
}

//funcion que permite separar una palabra
function splitWord(string) {
    let splittedWord = string.split('');
    return splittedWord;
}


iniciarGame.addEventListener('click', function(event){
    event.preventDefault();
    toUpperCasePalabras();
    console.log(bancoPalabras);
    document.querySelector("#divAhorcado").hidden = false;
    document.querySelector("#divAgregarPalabra").hidden = true;

    document.documentElement.scrollTop = 10000;
    document.querySelector("#inputLetra").focus();

})

//acciones auxiliares
console.log(palabraElegida);
pOutput.innerHTML = palabraConGuiones; 
document.querySelector("#cantidadVidas").innerHTML = "Vidas restantes: " + vidas;    
letrasUsadasArray.push("Letras usadas: ");
letrasUsadas.innerHTML = letrasUsadasArray;
letraYaUsada.hidden = true;
evLetra.addEventListener('click', function(){
    const letraIngresada = document.querySelector("#inputLetra").value;
    let haFallado = true;
    inputToValidate.willValidate = false;


    //aca hice algunas validaciones sobre el input de la letra, podria haber hecho una funcion aparte para esta parte   
    if(letraIngresada == "" || !(patron.test(letraIngresada))){
        mensajeErrorInputLetra.hidden = false;
        mensajeErrorInputLetra.style.borderColor = 'salmon';
        inputToValidate.style.borderColor = 'salmon';
        return;
    }
    else{
        inputToValidate.style.borderColor = 'palegreen';
        mensajeErrorInputLetra.hidden = true;
        mensajeErrorInputLetra.style.borderColor = 'palegreen';
    }

    //for para recorrer la palabra elegida y ver si la letra ingresada es parte de la misma
    for (const i in palabraElegida) {
        if (letraIngresada == palabraElegida[i]) {
            palabraConGuiones = palabraConGuiones.replaceAt(i*2, letraIngresada);
            haFallado = false;
        }
    }

    if(letrasUsadasArray.includes(letraIngresada)){
        letraYaUsada.innerHTML = "Ya utilizo la letra: " + letraIngresada;
        letraYaUsada.hidden = false;
    }
    else{
        letraYaUsada.hidden = true;
        if(!palabraElegida.includes(letraIngresada)){
            letrasUsadasArray.push(letraIngresada);
            letrasUsadas.innerHTML = letrasUsadasArray;
        }
        //controles de vidas
        if(haFallado){
            contadorFallos++;
            document.querySelector("#ahorcado").style.backgroundPosition = -(205 * contadorFallos) + 'px 0';
            vidas-= 1;
            if(contadorFallos == 4){
                document.querySelector("#perdedor").style.display = 'flex';
                document.querySelector("#mensajePerdedor").innerHTML = "Oh no! \nPerdiste, la palabra era: " + palabraElegida;
            }
        }
        else{
            if(palabraConGuiones.indexOf('_') < 0){ //si no encuentra ningun guion, devuelve -1
                document.querySelector("#ganador").style.display = 'flex';
                document.querySelector("#mensajeGanador").innerHTML = "Ganaste!!!";
            }
        }
        
    }
    

    

    pOutput.innerHTML = palabraConGuiones;

    document.querySelector("#inputLetra").value = "";
    document.querySelector("#inputLetra").focus();
    document.querySelector("#cantidadVidas").innerHTML = "Vidas restantes: " + vidas;    
    
})

//FUNCIONES BOTONES VOLVER
botonVolver.addEventListener('click', function(){
    location.reload();
    document.querySelector("#divAhorcado").hidden = true;
    document.querySelector("#divAgregarPalabra").hidden = false;
})

botonVolverGanaste.addEventListener('click', function(){
    location.reload();
    document.querySelector("#divAhorcado").hidden = true;
    document.querySelector("#divAgregarPalabra").hidden = false;
})

botonVolverPerdiste.addEventListener('click', function(){
    location.reload();
    document.querySelector("#divAhorcado").hidden = true;
    document.querySelector("#divAgregarPalabra").hidden = false;
})





