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
  #idRegistro;
  #nombre;
  #rut;
  #rubro;
  #tamano;
  #importaciones = [];

  constructor(idRegistro, nombre, rut, rubro, tamano) {
    this.#idRegistro = idRegistro;
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
  #idImportacion;
  #productos;

  constructor(idImportacion, productos = []) {
    this.#idImportacion = idImportacion;
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
    this.productos.push(producto);
  }

  obtenerValor() {
    return this.#productos.reduce(
      (acc, producto) => acc + producto.obtenerValor(),
      0
    );
  }
}

class Producto {
  #nombre;
  #cantidad;
  #precio;

  constructor(nombre, cantidad, precio) {
    this.#nombre = nombre;
    this.#cantidad = cantidad;
    this.#precio = precio;
  }

  //getters
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

const aduana = new Aduana();
const empresa1 = new Empresa(
  12345678,
  'AgroHolman Limitada',
  '75.123.123-0',
  'agrícola',
  'pequeño'
);
const empresa2 = new Empresa(
  12341234,
  'Calerita Dynamics Inc',
  '76.000.000-0',
  'tecnología',
  'mediano'
);

aduana.registrarEmpresa(empresa1);
aduana.registrarEmpresa(empresa2);

const producto1 = new Producto('Maceta VCG 10', 50000, 40);
const producto2 = new Producto('Maceta VCG 15', 20000, 70);
const producto3 = new Producto('Arduino Uno', 1000, 10000);

const importacion1 = new Importacion(1234, [producto1, producto2]);

const importacion2 = new Importacion(2345);
importacion2.agregarProducto(producto3);

empresa1.agregarImportacion(importacion1);
empresa2.agregarImportacion(importacion2);

aduana.empresas.forEach((empresa) => {
  console.log(
    `La empresa ${empresa.nombre}, rut ${empresa.rut}, id de registro ${
      empresa.idRegistro
    }, ha realizado ${empresa.obtenerCantidadDeImportaciones()} importaciones, por un valor total de $${empresa.obtenerValorTotalDeImportaciones()}.`
  );
});

console.log(
  'Empresas clasificadas por id de registro:\n',
  aduana.clasificarEmpresas('idRegistro')
);

console.log(
  'Empresas clasificadas por nombre:\n',
  aduana.clasificarEmpresas('nombre')
);

console.log(
  'Empresas clasificadas por rut:\n',
  aduana.clasificarEmpresas('rut')
);

console.log(
  'Registro de importaciones por empresa: ',
  aduana.obtenerImportacionesPorEmpresa()
);
