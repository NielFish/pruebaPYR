let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

window.onload = function () {
    // Hacer la solicitud a la API
    fetch('http://localhost:3000/api/preguntas')
        .then(response => response.json())
        .then(data => {
            interprete_bp = data; // Asignar los datos obtenidos a tu variable interprete_bp
            escogerPreguntaAleatoria();
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
};


let pregunta;
let posibles_respuestas;
btn_correspondiente = [
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function escogerPreguntaAleatoria() {
    let n;
    if (preguntas_aleatorias) {
        n = Math.floor(Math.random() * interprete_bp.length);
    } else {
        n = 0;
    }

    while (npreguntas.includes(n)) {
        n++;
        if (n >= interprete_bp.length) {
            n = 0;
        }
        if (npreguntas.length > 5) {
            //Aquí es donde el juego se reinicia
            if (mostrar_pantalla_juego_términado) {
                swal.fire({
                    title: "Juego finalizado",
                    text:
                        "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
                    icon: "success"
                });
            }
            if (reiniciar_puntos_al_reiniciar_el_juego) {
                preguntas_correctas = 0
                preguntas_hechas = 0
            }
            npreguntas = [];
        }
    }
    npreguntas.push(n);
    preguntas_hechas++;

    escogerPregunta(n);
}

function escogerPregunta(n) {
    pregunta = interprete_bp[n];
    select_id("categoria").innerHTML = pregunta.categoria;
    select_id("pregunta").innerHTML = pregunta.pregunta;
    select_id("numero").innerHTML = n;
    let pc = preguntas_correctas;
    if (preguntas_hechas > 1) {
        select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
    } else {
        select_id("puntaje").innerHTML = "";
    }

    desordenarRespuestas(pregunta);

}

function desordenarRespuestas(pregunta) {
    posibles_respuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3,
    ];
    posibles_respuestas.sort(() => Math.random() - 0.5);

    select_id("btn1").innerHTML = posibles_respuestas[0];
    select_id("btn2").innerHTML = posibles_respuestas[1];
    select_id("btn3").innerHTML = posibles_respuestas[2];
    select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
    if (suspender_botones) {
        return;
    }
    suspender_botones = true;
    if (posibles_respuestas[i] == pregunta.respuesta) {
        preguntas_correctas++;
        btn_correspondiente[i].style.background = "lightgreen";
    } else {
        btn_correspondiente[i].style.background = "pink";
    }
    for (let j = 0; j < 4; j++) {
        if (posibles_respuestas[j] == pregunta.respuesta) {
            btn_correspondiente[j].style.background = "lightgreen";
            break;
        }
    }
    setTimeout(() => {
        reiniciar();
        suspender_botones = false;
    }, 3000);
}

// let p = prompt("numero")

function reiniciar() {
    for (const btn of btn_correspondiente) {
        btn.style.background = "white";
    }
    escogerPreguntaAleatoria();
}

function select_id(id) {
    return document.getElementById(id);
}

function style(id) {
    return select_id(id).style;
}

function readText(ruta_local) {
    let texto = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
        texto = xmlhttp.responseText;
    }
    return texto;
}
