let botonPiedra = document.querySelector(".piedra");
let botonPapel = document.querySelector(".papel");
let botonTijera = document.querySelector(".tijera");
let manoUsuario = document.querySelector(".mano-usuario");
let manoComputador = document.querySelector(".mano-computador");
let puntajeUsuario = document.querySelector(".puntaje-usuario p");
let puntajeComputador = document.querySelector(".puntaje-computador p");
let labelResultado = document.querySelector(".resultado");
let tablero = document.querySelector(".tablero");

let conUsuario = 0;
let conComputador = 0;


const eleccionCompu = () => {
    let opcionAlAzar = Math.floor(Math.random() * 3);

    if (opcionAlAzar === 0) {
        manoComputador.src = "assets/piedra_computadora.png";
        return "piedra";
    } else if (opcionAlAzar === 1) {
        manoComputador.src = "assets/papel_computadora.png";
        return "papel";
    } else {
        manoComputador.src = "assets/tijera_computadora.png";
        return "tijera";
    }
};

const resultado = (eleccionUsuario, eleccionComputadora) => {
    if (eleccionUsuario === eleccionComputadora) {
        return "Empate";
    } else if (
        (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
        (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
        (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
    ) {
        return "Tú ganas";
    } else {
        return "tu pierdes";
        
    }
};

const actualizarPuntaje = (resultado) => {
    if (resultado === "Tú ganas") {
        conUsuario++;
    } else if (resultado === "tu pierdes") {
        conComputador++;
    }
    puntajeUsuario.textContent = conUsuario;
    puntajeComputador.textContent = conComputador;

    if (conUsuario == 5 || conComputador == 5) {
        setTimeout(mostrarGanador, 1000);
    }
};

const mostrarInicio = () => {
    Swal.fire("¡Bienvenido al juego!", "Selecciona una opción para empezar.",);
};

const mostrarGanador = () => {
    if (conUsuario > conComputador) {
        Swal.fire("🎊¡Eres el ganador!😎", "", "success");
    } else if (conComputador > conUsuario) {
        Swal.fire("Has perdido 💔😭.", "", "error");
    } else {
        Swal.fire("¡Empate!", "", "info");
    }

    conUsuario = 0;
    conComputador = 0;
    puntajeUsuario.textContent = conUsuario;
    puntajeComputador.textContent = conComputador;
    manoUsuario.src = "";
    manoComputador.src = "";
    labelResultado.textContent = "Seleccione una opción";
};

const seleccionUsuario = (eleccion) => {
    manoUsuario.src = `assets/${eleccion}_user.png`;
    labelResultado.textContent = "...";
    tablero.classList.add("jugando");
    setTimeout(() => {
        eleccionUsuario = eleccion;
        manoUsuario.src = `assets/${eleccion}_user.png`;
        let eleccionComputadora = eleccionCompu();
        let res = resultado(eleccionUsuario, eleccionComputadora);
        labelResultado.textContent = res;
        actualizarPuntaje(res);
        tablero.classList.remove("jugando");
    }, 2000);
};


botonPiedra.onclick = () => {
    seleccionUsuario("piedra");
};

botonPapel.onclick = () => {
    seleccionUsuario("papel");
};

botonTijera.onclick = () => {
    seleccionUsuario("tijera");
};

mostrarInicio();