# Estructurales

## ADAPTER

Permite que **dos interfaces incompatibles trabajen juntas**.

En otras palabras: actúa como un "traductor" entre dos clases/objetos que de otra forma no podrían comunicarse.

Se usa cuando:

- Tienes una librería/clase con una interfaz distinta a la que tu aplicación espera.
- Quieres **reutilizar código existente** sin modificarlo.

```jsx
// Clase existente (de un tercero)
class UsuarioExterno {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
  }

  obtenerNombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
}

// Adapter para que se ajuste a lo que esperamos
class UsuarioAdapter {
  constructor(usuarioExterno) {
    this.usuarioExterno = usuarioExterno;
  }

  getNombre() {
    return this.usuarioExterno.obtenerNombreCompleto();
  }
}

// Uso
const usuarioExterno = new UsuarioExterno("Ana", "Pérez");
const usuarioAdaptado = new UsuarioAdapter(usuarioExterno);

console.log(usuarioAdaptado.getNombre()); // Ana Pérez
```

## BRIDGE

**Separa la abstracción de su implementación**, permitiendo que ambas evolucionen de forma independiente.

**Cuándo usarlo:**

- Cuando quieres cambiar la implementación sin modificar la abstracción.
- Cuando tienes múltiples combinaciones de clases (ejemplo: Formas + Colores)

```jsx
// Implementación
class Rojo {
  aplicarColor() {
    return "rojo";
  }
}
class Azul {
  aplicarColor() {
    return "azul";
  }
}

// Abstracción
class Forma {
  constructor(color) {
    this.color = color;
  }
}
class Circulo extends Forma {
  dibujar() {
    console.log(`Dibujando un círculo ${this.color.aplicarColor()}`);
  }
}

// Uso
const circuloRojo = new Circulo(new Rojo());
circuloRojo.dibujar(); // Dibujando un círculo rojo
```

## COMPOSITE

Permite **tratar objetos individuales y compuestos de la misma forma**.

Piensa en un árbol: una hoja es un nodo simple, y una rama contiene más nodos, pero ambos se manejan con la misma interfaz.

**Cuándo usarlo:**

- Cuando tienes estructuras jerárquicas (árboles).
- Ejemplo: Carpetas y archivos en un sistema de ficheros.

```jsx
// Componente
class Archivo {
  mostrar() {}
}

// Hoja
class ArchivoTexto extends Archivo {
  constructor(nombre) {
    super();
    this.nombre = nombre;
  }
  mostrar() {
    console.log(`Archivo: ${this.nombre}`);
  }
}

// Compuesto
class Carpeta extends Archivo {
  constructor(nombre) {
    super();
    this.nombre = nombre;
    this.elementos = [];
  }
  agregar(elemento) {
    this.elementos.push(elemento);
  }
  mostrar() {
    console.log(`Carpeta: ${this.nombre}`);
    this.elementos.forEach((e) => e.mostrar());
  }
}

// Uso
const carpeta = new Carpeta("Documentos");
carpeta.agregar(new ArchivoTexto("cv.txt"));
carpeta.agregar(new ArchivoTexto("notas.txt"));
carpeta.mostrar();
```

## DECORATOR

Permite **añadir funcionalidades dinámicamente a un objeto**, sin modificar su código original.

**Cuándo usarlo:**

- Cuando quieres extender funcionalidades en tiempo de ejecución.
- Ejemplo: Un `Café` básico que puede decorarse con leche, azúcar, crema, etc.

```jsx
// Objeto base
class Cafe {
  costo() {
    return 5;
  }
}

// Decorador
class ConLeche {
  constructor(cafe) {
    this.cafe = cafe;
  }
  costo() {
    return this.cafe.costo() + 2;
  }
}

// Uso
let cafe = new Cafe();
console.log(cafe.costo()); // 5

cafe = new ConLeche(cafe);
console.log(cafe.costo()); // 7
```

## FACADE

**Provee una interfaz simplificada** a un conjunto complejo de clases o subsistemas.

**Cuándo usarlo:**

- Cuando quieres ocultar la complejidad de un sistema detrás de una API sencilla.
- Ejemplo: Un `SistemaDeHotel` que internamente maneja reservas, pagos y notificaciones, pero ofrece un único método `reservarHabitacion()`.

```jsx
class SistemaReservas {
  reservar() {
    console.log("Reserva hecha ");
  }
}
class SistemaPagos {
  pagar() {
    console.log("Pago realizado ");
  }
}
class SistemaNotificaciones {
  notificar() {
    console.log("Notificación enviada ");
  }
}

// Fachada
class HotelFacade {
  reservarHabitacion() {
    new SistemaReservas().reservar();
    new SistemaPagos().pagar();
    new SistemaNotificaciones().notificar();
  }
}

// Uso
const hotel = new HotelFacade();
hotel.reservarHabitacion();
```

## FLYWIGHT

**Reduce el uso de memoria compartiendo datos comunes** entre objetos similares.

**Cuándo usarlo:**

- Cuando necesitas crear muchísimos objetos que comparten la mayoría de su estado.
- Ejemplo: Un videojuego con miles de árboles: todos usan el mismo modelo gráfico, pero cambian su posición.

```jsx
// Flyweight
class Arbol {
  constructor(tipo) {
    this.tipo = tipo; // compartido
  }
  mostrar(posicion) {
    console.log(`Árbol ${this.tipo} en posición ${posicion}`);
  }
}

// Flyweight Factory
class ArbolFactory {
  constructor() {
    this.arboles = {};
  }
  getArbol(tipo) {
    if (!this.arboles[tipo]) {
      this.arboles[tipo] = new Arbol(tipo);
    }
    return this.arboles[tipo];
  }
}

// Uso
const factory = new ArbolFactory();
const arbol1 = factory.getArbol("Pino");
const arbol2 = factory.getArbol("Pino");
console.log(arbol1 === arbol2); // true
arbol1.mostrar("x:10,y:20");
```

## PROXY

Actúa como **un intermediario entre el cliente y el objeto real**.

**Tipos comunes de proxy:**

- **Virtual Proxy:** retrasa la creación de un objeto costoso hasta que sea necesario.
- **Remote Proxy:** controla el acceso a un objeto que está en otra máquina.
- **Protection Proxy:** controla el acceso según permisos.

```jsx
// Objeto real
class ImagenReal {
  constructor(archivo) {
    this.archivo = archivo;
    this.cargar();
  }
  cargar() {
    console.log(`Cargando ${this.archivo}...`);
  }
  mostrar() {
    console.log(`Mostrando ${this.archivo}`);
  }
}

// Proxy
class ImagenProxy {
  constructor(archivo) {
    this.archivo = archivo;
    this.imagenReal = null;
  }
  mostrar() {
    if (!this.imagenReal) {
      this.imagenReal = new ImagenReal(this.archivo);
    }
    this.imagenReal.mostrar();
  }
}

// Uso
const imagen = new ImagenProxy("foto.png");
imagen.mostrar(); // carga + muestra
imagen.mostrar(); // solo muestra (ya estaba cargada)
```
