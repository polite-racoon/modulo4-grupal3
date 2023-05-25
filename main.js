// Formulario Registro de Empresa
const formularioEmpresa = document.getElementById('formularioEmpresa');
const nombreEmpresa = document.getElementById('nombreEmpresa');
const rut = document.getElementById('rut');
const rubro = document.getElementById('rubro');
const tamano = document.getElementById('tamano');

// Formulario Registro de importaciones
const formularioImportacion = document.getElementById('formularioImportacion');
const empresasSelectElement = document.getElementById('empresasSelectElement');
const productosDiv = document.getElementById('productosDiv');

// Formulario Registro de productos
const formularioProducto = document.getElementById('formularioProducto');
const nombreProducto = document.getElementById('nombreProducto');
const cantidadProducto = document.getElementById('cantidadProducto');
const precioProducto = document.getElementById('precioProducto');

// Mostrar Empresas Registradas
const empresasRegistradas = document.getElementById('empresasRegistradas');

// data
const listaDeProductos = [];
const listaDeEmpresas = [];

//listeners
formularioEmpresa.addEventListener('submit', (e) => {
  e.preventDefault();
  const nuevaEmpresa = new Empresa(
    nombreEmpresa.value,
    rut.value,
    rubro.value,
    tamano.value
  );
  listaDeEmpresas.push(nuevaEmpresa);

  // agrega un option en el seleccionador de empresas
  const optionElement = document.createElement('option');
  optionElement.value = nuevaEmpresa.idRegistro;
  optionElement.textContent = nuevaEmpresa.nombre;

  empresasSelectElement.appendChild(optionElement);

  // agrega una empresa en la tabla de empresas registradas

  const fila = document.createElement('div');
  fila.className = 'row';
  fila.innerHTML = `
  <div class="col">${nuevaEmpresa.idRegistro}</div>
  <div class="col">${nuevaEmpresa.nombre}</div>
  <div class="col">${nuevaEmpresa.rut}</div>
  <div class="col">${nuevaEmpresa.rubro}</div>
  <div class="col">${nuevaEmpresa.tamano}</div>
  <div id="${nuevaEmpresa.idRegistro}" class="col"></div>`;

  empresasRegistradas.appendChild(fila);

  // limpia formulario
  nombreEmpresa.value = '';
  rut.value = '';
  rubro.value = '';
  tamano.value = '';
});

formularioProducto.addEventListener('submit', (e) => {
  e.preventDefault();
  const producto = new Producto(
    nombreProducto.value,
    cantidadProducto.value,
    precioProducto.value
  );
  listaDeProductos.push(producto);

  const { idProducto, nombre, precio, cantidad } = producto;

  const checkboxDiv = document.createElement('div');
  checkboxDiv.style = 'font-size: 0.6rem;';
  checkboxDiv.innerHTML = `
    <input class="productoCheckbox" id="${idProducto}" type="checkbox" value='${idProducto}'>
    <label for="${idProducto}">${nombre}/ precio: $${precio}/ cantidad: ${cantidad}/ total: ${producto.obtenerValor()}</label>
    <br></br>
    `;

  productosDiv.appendChild(checkboxDiv);

  // limpia formulario
  nombreProducto.value = '';
  cantidadProducto.value = '';
  precioProducto.value = '';
});

formularioImportacion.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!empresasSelectElement.value) {
    alert('Debe seleccionar una empresa');
    return;
  }

  checkboxes = document.querySelectorAll('.productoCheckbox'); // NodeList object
  // console.log(checkboxSelecionados);
  // console.log(Array.from(checkboxSelecionados));
  // console.log(Object.values(checkboxSelecionados));
  const idsProductosSelecionados = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) idsProductosSelecionados.push(checkbox.value);
  });

  // creamos un objeto con los productos indexados por id,
  // de esta forma evitamos usar array.filter() junto con array.includes(), lo cual podria resultar ineficiente
  // para esta aplicacion es exagerado, pero lo hicimos por aprender

  const productosPorId = listaDeProductos.reduce(
    (acc, el) => ({ ...acc, [el.idProducto]: el }),
    {}
  );

  const productosSelecionados = idsProductosSelecionados.map(
    (id) => productosPorId[id]
  );

  // Objeto importacion
  const importacion = new Importacion(productosSelecionados);

  // Objeto de la empresa seleccionada
  const empresa = listaDeEmpresas.find(
    (empresa) => empresa.idRegistro === Number(empresasSelectElement.value)
  );

  empresa.agregarImportacion(importacion);

  const cuadro = document.getElementById(empresa.idRegistro);
  const div = document.createElement('div');
  div.innerHTML = importacion.idImportacion;

  let productos = '';
  importacion.productos.forEach((producto) => {
    productos += `${producto.nombre}/ cantidad: ${producto.cantidad}/ precio: ${
      producto.precio
    }/ valor: ${producto.obtenerValor()}\n`;
  });

  const button = document.createElement('button');
  button.textContent = 'Ver';
  button.className = 'btn btn-primary ml-1 p-1';
  button.addEventListener('click', function () {
    alert(
      productos + `valor total de la importación: ${importacion.obtenerValor()}`
    );
  });
  div.appendChild(button);

  cuadro.appendChild(div);

  // limpia formulario
  empresasSelectElement.value = '';
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
});

// clases

class Aduana {
  #empresas = [];

  //getters

  get empresas() {
    return this.#empresas;
  }

  //methods

  registrarEmpresa(empresa) {
    this.#empresas.push(empresa);
  }

  clasificarEmpresas(campo) {
    const empresasClasificadasPorCampo = this.#empresas.reduce(
      (acc, empresa) => ({
        ...acc,
        [empresa[campo]]: empresa,
      }),
      {}
    );
    return empresasClasificadasPorCampo;
  }

  obtenerImportacionesPorEmpresa() {
    const registro = this.#empresas.reduce(
      (acc, empresa) => ({ ...acc, [empresa.nombre]: empresa.importaciones }),
      {}
    );
    return registro;
  }
}

class Empresa {
  #idRegistro = (() => Math.floor(Math.random() * 1000000000))();
  #nombre;
  #rut;
  #rubro;
  #tamano;
  #importaciones = [];

  constructor(nombre, rut, rubro, tamano) {
    this.#nombre = nombre;
    this.#rut = rut;
    this.#rubro = rubro;
    this.#tamano = tamano;
  }

  //getters

  get idRegistro() {
    return this.#idRegistro;
  }

  get nombre() {
    return this.#nombre;
  }

  get rut() {
    return this.#rut;
  }

  get rubro() {
    return this.#rubro;
  }

  get tamano() {
    return this.#tamano;
  }

  get importaciones() {
    return this.#importaciones;
  }

  // methods

  agregarImportacion(importacion) {
    this.#importaciones.push(importacion);
  }

  obtenerCantidadDeImportaciones() {
    return this.#importaciones.length;
  }

  obtenerValorTotalDeImportaciones() {
    return this.#importaciones.reduce(
      (acc, importacion) => acc + importacion.obtenerValor(),
      0
    );
  }
}

class Importacion {
  #productos = [];
  #idImportacion = (() => Math.floor(Math.random() * 1000000000))();

  constructor(productos = []) {
    this.#productos = productos;
  }

  // getters
  get idImportacion() {
    return this.#idImportacion;
  }

  get productos() {
    return this.#productos;
  }

  // methods
  agregarProducto(producto) {
    console.log(this.#productos);
    this.#productos.push(producto);
  }

  obtenerValor() {
    console.log('calculando valor');
    return this.#productos.reduce(
      (acc, producto) => acc + producto.obtenerValor(),
      0
    );
  }
}

class Producto {
  #idProducto = (() => Math.floor(Math.random() * 1000000000))();
  #nombre;
  #cantidad;
  #precio;

  constructor(nombre, cantidad, precio) {
    this.#nombre = nombre;
    this.#cantidad = cantidad;
    this.#precio = precio;
  }

  //getters
  get idProducto() {
    return this.#idProducto;
  }

  get nombre() {
    return this.#nombre;
  }

  get cantidad() {
    return this.#cantidad;
  }

  get precio() {
    return this.#precio;
  }

  //methods
  obtenerValor() {
    return this.#cantidad * this.#precio;
  }
}

alert(
  'Registre empresas, luego regisre productos y finalmente registre importación.'
);
