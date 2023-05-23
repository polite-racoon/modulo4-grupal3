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
  #importaciones = [];

  constructor(idRegistro, nombre, rut) {
    this.#idRegistro = idRegistro;
    this.#nombre = nombre;
    this.#rut = rut;
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
  #producto;
  #cantidadDeProducto;
  #precio;

  constructor(idImportacion, producto, cantidadDeProducto, precio) {
    this.#idImportacion = idImportacion;
    this.#producto = producto;
    this.#cantidadDeProducto = cantidadDeProducto;
    this.#precio = precio;
  }
  // getters
  get idImportacion() {
    return this.#idImportacion;
  }

  get producto() {
    return this.#producto;
  }

  get cantidadDeProducto() {
    return this.#cantidadDeProducto;
  }

  get precio() {
    return this.#precio;
  }

  // methods
  obtenerValor() {
    return this.#cantidadDeProducto * this.#precio;
  }
}
const aduana = new Aduana();
const empresa1 = new Empresa(12345678, 'AgroHolman Limitada', '75.123.123-0');
const empresa2 = new Empresa(12341234, 'Calerita Dynamics Inc', '76.000.000-0');

aduana.registrarEmpresa(empresa1);
aduana.registrarEmpresa(empresa2);

const importacion1 = new Importacion(1234, 'Maceta VCG 10', 50000, 40);
const importacion2 = new Importacion(5678, 'Maceta VCG 15', 20000, 70);
const importacion3 = new Importacion(2345, 'Arduino Uno', 1000, 10000);

empresa1.agregarImportacion(importacion1);
empresa1.agregarImportacion(importacion2);
empresa2.agregarImportacion(importacion3);

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
