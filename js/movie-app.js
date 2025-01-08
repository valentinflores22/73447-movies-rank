const movies = [

    {
        id: 1000,
        title: 'The Godfather',
        genre: 'Drama',
        date: 1972,
        score: 5,
        image: 'https://play-lh.googleusercontent.com/ZucjGxDqQ-cHIN-8YA1HgZx7dFhXkfnz73SrdRPmOOHEax08sngqZMR_jMKq0sZuv5P7-T2Z2aHJ1uGQiys'
    },
    {
        id: 1001,
        title: 'God of War',
        genre: 'Drama',
        date: 1994,
        score: 2,
        image: 'https://i5.walmartimages.com/asr/5003a7b8-81c5-4803-beee-df5417f06bbe.1f75ffb05ff4e640f976691214312d6a.jpeg'
    },
    {
        id: 1002,
        title: 'The Dark Knight',
        genre: 'Action',
        date: 2008,
        score: 4,
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg'
    },
];

pintarPeliculas(movies);

// Obtener el formulario de carga de peliculas desde el DOM
const moviesForm = document.getElementById("moviesForm");

// Necesito escuchar cuando el usuario envíe el formulario
moviesForm.addEventListener("submit", function(evento) {
    // Evitar que el formulario se envie
    evento.preventDefault(); // PONERLO SIEMPRE

    const el = evento.target.elements;
    // En base a los datos ingresados por el usuario, crear un objeto de película.
    
    const pelicula = {
        id: new Date().getTime(),
        title: el.title.value,
        genre: el.genre.value,
        score: el.score.value,
        date: el.date.value.slice(0, 4),
        image: el.image.value,
    }

    console.log(pelicula)
    // const titulo = evento.target.elements.title.value;
    // Agregar la película al array de películas
    movies.push(pelicula);

    pintarPeliculas(movies);
})

// Necesito crear una función que reciba un array, lo recorra y pinte una <tr></tr> por cada película

function pintarPeliculas(arrayPeliculas) {

    const tbody = document.querySelector("tbody");

    // Vaciar el tbody
    tbody.innerHTML ="";

    arrayPeliculas.forEach ((peli) => {

    tbody.innerHTML += `<tr>
                            <td class="image-cell">
                                <img loading="lazy" src="${peli.image}" alt="${peli.title} image">
                            </td>
                            <td class="name-cell">
                                <div class="name">
                                    ${peli.title}
                                </div>
                            </td>
                            <td class="genre-cell">
                                <div class="genre">
                                    ${peli.genre}
                                </div>
                            </td>
                            <td class="score-cell">
                                <div class="score">
                                    ${peli.score}
                                </div>
                            </td>
                            <td class="date-cell">
                                <div class="date">
                                    ${peli.date}
                                </div>
                            </td>
                            <td class="actions-cell">
                                <div class="actions">
                                    <button class="btn btn-primary">

                                        <i class="fa-solid fa-pencil"></i>
                                    </button>

                                    <button data-bs-toggle="modal" data-bs-target="#detalle-pelicula" class="btn btn-success" onclick="mostrarDetalle(${peli.id})">
                                        <i class="fa-solid fa-eye"></i>
                                    </button>
                                    
                                    <button class="btn btn-danger" onclick="eliminarPelicula(${peli.id})">
                                        <i class="fa-solid fa-trash"></i>

                                    </button>
                                </div>
                            </td>
                        </tr>`

    })
}

pintarPeliculas(movies);

// FILTRO DE PELICULAS POR NOMBRE 

// 1- Obtener el input de busqueda desde el DOM

const searchInput = document.getElementById("search")

// 2- Escuchar el evento de input en el input de busqueda

searchInput.addEventListener ("input", function(evt) {

    // 3- Obtener el texto ingresado por el usuario 
    const texto = evt.target.value.toLowerCase();
    console.log(texto)

    // 4- Filtrar las peliculas en base al texto ingresado por el usuario

    // 4.1 Recorrer el array de peliculas 1 por 1
    

    const peliculasFiltradas = movies.filter((movie) => {

        const movieName = movie.title.toLowerCase()

        // 4.2 Por cada película voy a checkear lo que el usuario ingresó en el input respecto al título de la película y en base a esto voy armar un nuevo array con las películas cuyo nombre incluya el texto ingresado por el usuario

        return movieName.includes(texto)

    })

    // 5- Pintar las peliculas filtradas

    pintarPeliculas(peliculasFiltradas)
})


// Borrar Pelicula del array

// Vamos a escuchar cuando la persona hace click en el botón eliminar
// Cuando presione el botón, enviar el ID de la peli que queremos borrar

function eliminarPelicula(identificador) {

    // Tengo que buscar en el array la película correspondiente

    const index = movies.findIndex(pelicula => {

        // El valor que recibí en mi fn "identificador" sea igual a pelicula.id

        // return identificador === pelicula.id;

        if(identificador === pelicula.id) {

            return true

        } else {

            return false

        }

    })

    const isConfirm = confirm("Realmente desea eliminar la película?")

    if(isConfirm) {

    // Teniendo la posición o indice de la pelicula

    movies.splice(index, 1);

    pintarPeliculas(movies);

    alert("Película borrada exitosamente")

    }

}

// Mostrar el detalle de una película en partícular

function mostrarDetalle(ID) {

    // const modalHTML = document.querySelector("#detalle-pelicula");
    const modalTitleHTML = document.querySelector("#detalle-title");
    const modalBodyHTML = document.querySelector("#detalle-body");

    const pelicula = movies.find(movie => {

        return movie.id === ID;

    })
    
    modalTitleHTML.innerText = pelicula.title;

    modalBodyHTML.innerHTML = `<div class="row">
                                 <div class="col-6">
                                    <img src="${pelicula.image}" class="w-100">
                                 </div>
                                 <div class="col-6">
                                    <span class="badge text-bg-secondary">${pelicula.genre}</span>
                                 </div>
                                </div>`

}

// Ordenar películas en base a su puntuación

