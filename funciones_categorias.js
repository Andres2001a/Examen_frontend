
const url = 'https://node-index-js-catf.onrender.com/categorias'

const listarCategorias = async () => {
    //Objeto del html donde se deslegará la información
    let objectId = document.getElementById('contenido')
    let contenido = ''//Contiene filas y celdas que se desplegarán en el tbody

    //Fecth permite reaizar peticiones http a una url
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())//Obtener respuesta de la petición
        .then(function (data) {//Se manipulan los datos obtenidos de la url
            let listaCategorias = data.msg //msg es el nombre de la lista retorna con json
            console.log(listaCategorias)
            listaCategorias.map(function (categoria) {
                //Configurar el objeto para enviarlo por url
                objetoCategoria = Object.keys(categoria).map(key => key + '=' +
                    encodeURIComponent(categoria[key])).join('&');
                console.log(categoria)
                contenido = contenido + `<tr>` +
                    `<td>` + categoria.id_categoria + `</td>` +
                    `<td>` + categoria.nombre_categoria + `</td>` +
                    `<td>` + categoria.descripcion_categoria + `</td>` +
                    `<td><button onclick="redireccionarEditar('${objetoCategoria}')"
            style= "border: 1px solid grey; background: none;">
            EDITAR
            </td>`+
                    `<td>
        <button onclick="eliminarCategoria('${categoria.id_categoria}')"
                style="border: 1px solid grey; background: none;">
                ELIMINAR
        </button>
    </td>`+
                    `</tr>`
            })
            objectId.innerHTML = contenido
        })

}

const registrarCategoria = () => {
    const id = document.getElementById('id_c').value;
    const nombre = document.getElementById('nombre_c').value
    const descripcion = document.getElementById('desc_c').value


    if (id.length == 0) {
        document.getElementById('id_cHelp').innerHTML = 'Dato requerido'

    }
    else if (nombre.length == 0) {
        document.getElementById('nombre_cHelp').innerHTML = 'Dato requerido'
    }
    else if (descripcion == 0) {
        document.getElementById('desc_cHelp').innerHTML = 'Dato requerido'
    } else {
        let categoria = {
            id_categoria: id,
            nombre_categoria: nombre,
            descripcion_categoria: descripcion
        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(categoria),//Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                alert(json.msg) //Imprimir el mensaje de la transacción
            })
            alert('CATEGORIA GUARDADA')
            document.location.href = "listaCategorias.html"
    }
}

const actualizarCategoria = () => {
    const id = document.getElementById('id_c').value;
    const nombre = document.getElementById('nombre_c').value
    const descripcion = document.getElementById('desc_c').value


    if (id.length == 0) {
        document.getElementById('id_cHelp').innerHTML = 'Dato requerido'

    }
    else if (nombre.length == 0) {
        document.getElementById('nombre_cHelp').innerHTML = 'Dato requerido'
    }
    else if (descripcion == 0) {
        document.getElementById('desc_cHelp').innerHTML = 'Dato requerido'
    } else {
        let categoria = {
            id_categoria: id,
            nombre_categoria: nombre,
            descripcion_categoria: descripcion
        }

        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(categoria),//Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                alert(json.msg) //Imprimir el mensaje de la transacción
            })
            alert('CATEGORIA ACTUALIZADA')
            document.location.href = "listaCategorias.html"
    }
}

const redireccionarEditar = (objetoVehiculo) => {
    document.location.href = 'editarCategoria.html?categoria=' + objetoVehiculo
}

const editarCategoria = () => {
    // Obtener datos de la url
    var urlParams = new URLSearchParams(window.location.search);
    //Asignar valores a cajas de texto
    document.getElementById('id_c').value = urlParams.get('id_categoria')
    document.getElementById('nombre_c').value = urlParams.get('nombre_categoria')
    document.getElementById('desc_c').value = urlParams.get('descripcion_categoria')


}

const eliminarCategoria = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoria?")) {
        fetch(`${url}?id_categoria=${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error de red - Código de estado ${res.status}`);
            }
            return res.json();
        })
        .then(json => {
            alert(json.msg);
            // Volver a cargar la lista después de eliminar
            listarCategorias();
        })
        .catch(error => console.error('Error al eliminar la categoría:', error.message));
    }
}





if (document.querySelector('#btnRegistrar')) { //Si objeto exitste
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarCategoria)
}

if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar')
        .addEventListener('click', actualizarCategoria)
}
