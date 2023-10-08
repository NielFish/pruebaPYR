window.onload = function () {
    // Hacer una solicitud GET a la API
    fetch('http://localhost:3000/api/preguntas')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Mostrar la respuesta de la API en la consola
            mostrarTabla(data); // Llamar a la función para mostrar la tabla con los datos recibidos
        })
        .catch(error => console.error(error));
};

function eliminarPregunta(id) {
    // Realiza una solicitud DELETE a la API con el ID de la pregunta a eliminar
    fetch(`http://localhost:3000/api/preguntas/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 204) {
                // recargar la pagina
                window.location.reload();
            } else {
                console.error("Error al eliminar la pregunta.");
            }
        })
        .catch(error => console.error(error));
}



function mostrarTabla(data) {
    let tableHtml = "<table border='1'>";
    // Agregar encabezados de tabla
    tableHtml += "<tr><th>#</th><th>Categoría</th><th>Pregunta</th><th>Respuesta</th><th>Incorrecta</th><th>Incorrecta</th><th>Incorrecta</th><th></th><th></th></tr>";

    // Recorrer los elementos del JSON y agregar filas a la tabla
    for (let i = 0; i < data.length; i++) {
        tableHtml += "<tr>";
        tableHtml += "<td>" + (i+1) + "</td>";
        tableHtml += "<td>" + data[i].categoria + "</td>";
        tableHtml += "<td>" + data[i].pregunta + "</td>";
        tableHtml += "<td>" + data[i].respuesta + "</td>";
        tableHtml += "<td>" + data[i].incorrecta1 + "</td>";
        tableHtml += "<td>" + data[i].incorrecta2 + "</td>";
        tableHtml += "<td>" + data[i].incorrecta3 + "</td>";
        tableHtml += "<td><button onclick='eliminarPregunta(" + data[i].id + ")'>Eliminar</button></td>";
        tableHtml += "<td><button onclick='redirigirModificar(" + data[i].id + ")'>Modificar</button></td>"; // Modificar el botón aquí
        tableHtml += "</tr>";
    }

    tableHtml += "</table>";

    // Mostrar la tabla en un elemento HTML con un ID específico (por ejemplo, "tablaJSON")
    document.getElementById("tablaJSON").innerHTML = tableHtml;
}

// Agregar un evento al formulario para enviar una solicitud POST al hacer clic en el botón "Agregar"
document.getElementById("formularioNuevaPregunta").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtiene los valores de los campos del formulario
    const categoria = document.getElementById("categoria").value;
    const pregunta = document.getElementById("pregunta").value;
    const respuesta = document.getElementById("respuesta").value;
    const incorrecta1 = document.getElementById("incorrecta1").value;
    const incorrecta2 = document.getElementById("incorrecta2").value;
    const incorrecta3 = document.getElementById("incorrecta3").value;

    // Crea un objeto con los datos de la nueva pregunta
    const nuevaPregunta = {
        categoria,
        pregunta,
        respuesta,
        incorrecta1,
        incorrecta2,
        incorrecta3
    };

    // Realiza una solicitud POST a la API para agregar la nueva pregunta
    fetch('http://localhost:3000/api/preguntas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaPregunta)
    })
        .then(response => {
            if (response.status === 201) {
                // Si la creación fue exitosa, actualiza la tabla
                actualizarTabla();
            } else {
                console.error("Error al añadir la pregunta.");
            }
        })
        .catch(error => console.error(error));
});

// MODIFICAR PREGUNTA

function redirigirModificar(id) {
    // Redirige a "modificarFormulario.html" con el ID como parámetro
    window.location.href = `modificarFormulario.html?id=${id}`;
    console.log("Modificar pregunta con ID: " + id);
}




