//variables
//input nueva palabra
var nuevaPalabra = document.querySelector("#inputNuevaPalabra");

//boton agregar palabra
var botonAgregar = document.querySelector("#nuevaPalabra");


//validaciones
// La siguiente funcion valida el elemento input nuevaPalabra
function validar(inputAValidar) {
    //Variable que usaremos para determinar si el input es valido
    var isValid = false;

    //El div con el mensaje de advertencia:
    const messageError = document.getElementById('mensajeError');
    const messageWordAdded = document.getElementById('mensajeWordAdded');

    inputAValidar.willValidate = false;

    // El tamaño maximo y minimo para nuestro input
    const maximo = 20;
    const minimo = 3

    // El patron que vamos a comprobar
    const patron = new RegExp('^[A-Z]+$', 'i');

    // Primera validacion, si input esta vacio entonces no es valido
    if(!inputAValidar.value) {
        isValid = false;
    } else {
        // Segunda validacion, si input es mayor que 20
        if(inputAValidar.value.length > maximo || inputAValidar.value.length < minimo) {
            isValid = false;
        } else {
            // Tercera validacion, si input contiene caracteres diferentes a los permitidos
            if(!patron.test(inputAValidar.value)){ 
                isValid = false;
            } else {
            // Si pasamos todas la validaciones anteriores, entonces el input es valido
                isValid = true;
            }
        }
    }

    //Ahora coloreamos el borde de nuestro input
    if(!isValid) {
        // rojo: no es valido
        inputAValidar.style.borderColor = 'salmon'; 
        // mostramos mensaje
        messageError.hidden = false;
        //ocultamos mensaje de guardado
        messageWordAdded.hidden = true;
    } else {
        // verde: si es valido
        inputAValidar.style.borderColor = 'palegreen'; 
        //decimos que se guardo con exito
        messageWordAdded.hidden = false;
        // ocultamos mensaje;
        messageError.hidden = true;
    }

    // devolvemos el valor de isValid
    return isValid;
}

// Por último, nuestra función que verifica si el campo es válido antes de realizar cualquier otra acción.
function verificar(inputAValidar) {
    const valido = validar(inputAValidar);
    if (!valido) {
        alert('El campo esta vacio. Por favor introduzca una palabra');
    }
}

function contiene(element, list){
    return list.includes(element);
}

function addNewWord(palabra, bancoPalabras){
    if(palabra != 0 && (!contiene(palabra, bancoPalabras))){
        bancoPalabras.push(palabra.toUpperCase());
    }
}


//funcion cuando se presiona el boton agregar palabra
botonAgregar.addEventListener("click", function(event){
    event.preventDefault();
    verificar(nuevaPalabra);

    var palabra = nuevaPalabra.value;
    addNewWord(palabra, bancoPalabras);
})