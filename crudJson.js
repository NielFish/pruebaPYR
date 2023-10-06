window.onload = function () {
    base_preguntas = readText("base-preguntas.json");
    interprete_bp = JSON.parse(base_preguntas);
    console.log(base_preguntas);

    // Llamar a la función para mostrar la tabla con la información del JSON
    mostrarTabla(interprete_bp);
};

function mostrarTabla(data) {
    let tableHtml = "<table border='1'>";
    // Agregar encabezados de tabla
    tableHtml += "<tr><th>Categoría</th><th>Pregunta</th><th>Respuesta</th></tr>";

    // Recorrer los elementos del JSON y agregar filas a la tabla
    for (let i = 0; i < data.length; i++) {
        tableHtml += "<tr>";
        tableHtml += "<td>" + data[i].categoria + "</td>";
        tableHtml += "<td>" + data[i].pregunta + "</td>";
        tableHtml += "<td>" + data[i].respuesta + "</td>";
        tableHtml += `<td><button onclick="borrarObjeto(${i})" data-id="${i}">Borrar</button></td>`;
        tableHtml += "</tr>";
    }

    tableHtml += "</table>";

    // Mostrar la tabla en un elemento HTML con un ID específico (por ejemplo, "tablaJSON")
    document.getElementById("tablaJSON").innerHTML = tableHtml;
}

function guardarCambiosEnJSON() {
    const jsonStr = JSON.stringify(interprete_bp);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "guardar-json.php", true); // Cambia "guardar-json.php" por la ruta correcta del script que guarda el JSON en el servidor
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.send(jsonStr);
}



function borrarObjeto(index) {
    if (confirm("¿Estás seguro de que deseas borrar este objeto?")) {
        interprete_bp.splice(index, 1); // Elimina el objeto del array
        guardarCambiosEnJSON(); // Guarda los cambios en el archivo JSON
        // Llamar a la función para volver a mostrar la tabla actualizada
        mostrarTabla(interprete_bp);
    }
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

