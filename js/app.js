// Selectores
const listaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
let arrayCursos = [];

// EventListeners
cargarEventListeners();
function cargarEventListeners() {
  // Agrega cursos al darle click
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // vaciar el carrito por completo
  vaciarCarrito.addEventListener("click", limpiarCarrito);
}

// Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Vaciar el carrito por completo
function limpiarCarrito(e) {
  if (e.target.classList.contains("vaciar-carrito")) {
    arrayCursos = [];
  }
}

// Eliminar curso
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Elimina el curso por medio del data-id
    arrayCursos = arrayCursos.filter((curso) => curso.id !== cursoId);
  }

  crearHTMLEnCarrito(arrayCursos);
}

// Leer los datos del curso seleccionado
function leerDatosCurso(curso) {
  //   console.log(curso);

  // Extrae la informacion del curso seleccionado
  const datosCurso = {
    imagen: curso.querySelector("img").src,
    nombre: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = arrayCursos.some((curso) => curso.id === datosCurso.id);

  if (existe) {
    // Actualizamos la cantidad
    const cursos = arrayCursos.map((curso) => {
      if (curso.id === datosCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el curso con la cantidad actualizada
      } else {
        return curso; // Retorna el curso tal y como es
      }
    });
    arrayCursos = [...cursos];
  } else {
    // Agregamos el curso al carrito
    arrayCursos = [...arrayCursos, datosCurso];
  }

  crearHTMLEnCarrito(arrayCursos);
}

// Inyectar el HTML en el carrito
function crearHTMLEnCarrito(curso) {
  // Limpia el arrayCurso antes de agregar un nuevo elemento
  limpiarHTML();

  // Recorrer el arrayCursos para crear dependiendo de la cantidad que se hayan agregado
  curso.forEach((curso) => {
    const { imagen, nombre, precio, cantidad, id } = curso;
    const row = document.createElement("tr");

    row.innerHTML = `
    <img src="${imagen}" width=100/>
    <td>${nombre}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td> 
    <a href="#" data-id="${id}" class="borrar-curso"> X </a>
    </td>
    `;

    contenedorCarrito.appendChild(row);
  });
}

// Limpiar HTML antes de agregar un nuevo elemento al carrito
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
