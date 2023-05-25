const formularioEmpresa = document.getElementById('formularioEmpresa');
// Inputs Formulario Registro de Empresa
//  nombre empresa (string) - rut (string) - rubro (string) - tamaño (string)
const nombreEmpresa = document.getElementById('nombreEmpresa');
const rut = document.getElementById('rut');
const rubro = document.getElementById('rubro');
const tamano = document.getElementById('tamano');

const formularioImportacion = document.getElementById('formularioImportacion');
// Inputs Formulario Registro de importaciones
// div vacio
const empresasSelectElement = document.getElementById('empresasSelectElement');
const productosDiv = document.getElementById('productosDiv');

const formularioProducto = document.getElementById('formularioProducto');
// Inputs Formulario Registro de productos
// nombre (string) - cantidad (numero) - precio (numero)
const nombreProducto = document.getElementById('nombreProducto');
const cantidadProducto = document.getElementById('cantidadProducto');
const precioProducto = document.getElementById('precioProducto');

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

  const optionElement = document.createElement('option');
  optionElement.innerHTML = `<option value="${nuevaEmpresa}">${nuevaEmpresa.nombre}</option>`;

  empresasSelectElement.appendChild(optionElement);
  nombreEmpresa.value = '';
  rut.value = '';
  rubro.value = '';
  tamano.value = '';

});

formularioImportacion.addEventListener('submit', (e) => {
  e.preventDefault();
  const importacion = new Importacion();
  // debes pasarle a Importacion los productos que podras elegir desde el formulario
  // agrega algunos productos desde la pagina para que veas como se ven
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
    <input id="${idProducto}" type="checkbox" value="${JSON.stringify(
    producto
  )}">
    <label for="${idProducto}">${nombre}/ precio: $${precio}/ cantidad: ${cantidad}/ total: ${producto.obtenerValor()}</label>
    <br></br>
    `;

  productosDiv.appendChild(checkboxDiv);

  // limpia formulario
  nombreProducto.value = '';
  cantidadProducto.value = '';
  precioProducto.value = '';
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
// Start
// if (listaDeEmpresas.length === 0) {
//   empresasSelectElement.innerHTML = <option value="">--No hay empresas registradas--</option>
// } else {

// }

// const aduana = new Aduana();
// const empresa1 = new Empresa(
//   12345678,
//   'AgroHolman Limitada',
//   '75.123.123-0',
//   'agrícola',
//   'pequeño'
// );
// const empresa2 = new Empresa(
//   12341234,
//   'Calerita Dynamics Inc',
//   '76.000.000-0',
//   'tecnología',
//   'mediano'
// );

// aduana.registrarEmpresa(empresa1);
// aduana.registrarEmpresa(empresa2);

// const producto1 = new Producto('Maceta VCG 10', 50000, 40);
// const producto2 = new Producto('Maceta VCG 15', 20000, 70);
// const producto3 = new Producto('Arduino Uno', 1000, 10000);

// const importacion1 = new Importacion([producto1, producto2]);

// const importacion2 = new Importacion();
// importacion2.agregarProducto(producto3);

// empresa1.agregarImportacion(importacion1);
// empresa2.agregarImportacion(importacion2);

// aduana.empresas.forEach((empresa) => {
//   console.log(
//     `La empresa ${empresa.nombre}, rut ${empresa.rut}, id de registro ${empresa.idRegistro
//     }, ha realizado ${empresa.obtenerCantidadDeImportaciones()} importaciones, por un valor total de $${empresa.obtenerValorTotalDeImportaciones()}.`
//   );
// });

// console.log(
//   'Empresas clasificadas por id de registro:\n',
//   aduana.clasificarEmpresas('idRegistro')
// );

// console.log(
//   'Empresas clasificadas por nombre:\n',
//   aduana.clasificarEmpresas('nombre')
// );

// console.log(
//   'Empresas clasificadas por rut:\n',
//   aduana.clasificarEmpresas('rut')
// );

// console.log(
//   'Registro de importaciones por empresa: ',
//   aduana.obtenerImportacionesPorEmpresa()
// );
