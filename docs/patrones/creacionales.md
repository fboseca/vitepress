# Creacionales

Tienen por objetivo la creación de objetos de forma eficiente.

## BUILDER

El patrón Builder es un patrón de diseño creacional que se utiliza para crear objetos complejos paso a paso. La idea es separar la construcción de un objeto de su representación, de manera que el mismo proceso de construcción pueda crear diferentes representaciones.
Se usa cuando el objeto tiene muchos atributos y quieres ir configurándolo poco a poco.

Características:

- Evita constructores con muchos parámetros (el famoso constructor telescópico).
- Permite construir un objeto de forma clara y flexible.
- La construcción se hace por pasos, y al final se “ensambla” el objeto.

```jsx
// 1. Clase del objeto final
class Auto {
  constructor() {
    this.marca = "";
  }
}

// 2. Builder
class AutoBuilder {
  constructor() {
    this.auto = new Auto();
  }

  setMarca(marca) {
    this.auto.marca = marca;
    return this; // Para encadenar métodos
  }

  build() {
    return this.auto;
  }
}

// 3. Uso del Builder
const miAuto = new AutoBuilder().setMarca("Toyota").build();
```

## FACTORY METHOD

Es un patrón de diseño creacional que define una interfaz para crear objetos, pero deja que las subclases decidan qué clase instanciar. En otras palabras: delegamos la creación del objeto a un método fábrica en lugar de usar new directamente.

Características:

- Centralizar la lógica de creación.
- Evitar código repetido para instanciar objetos.
- Facilitar agregar nuevos tipos de objetos sin cambiar código existente.

```jsx
class VehiculoFactory {
  crearVehiculo(tipo) {
    if (tipo === "auto") {
      return new Auto();
    } else if (tipo === "camioneta") {
      return new Camioneta();
    } else {
      throw new Error("Tipo de vehículo no soportado");
    }
  }
}

const factory = new VehiculoFactory();

const v1 = factory.crearVehiculo("auto");
const v2 = factory.crearVehiculo("camioneta");
```

## ABSTRACT FACTORY

Es un patrón de diseño creacional que sirve para crear familias de objetos relacionados sin especificar sus clases concretas. Piensa en él como una “fábrica de fábricas”. No solo crea un tipo de objeto (como el Factory Method), sino varios tipos que están pensados para funcionar juntos.

```jsx
class UIFactory {
  crearBoton() {}
  crearCheckbox() {}
}

class WindowsFactory extends UIFactory {
  crearBoton() {
    return new BotonWindows();
  }
  crearCheckbox() {
    return new CheckboxWindows();
  }
}
class MacFactory extends UIFactory {
  crearBoton() {
    return new BotonMac();
  }
  crearCheckbox() {
    return new CheckboxMac();
  }
}

function renderUI(factory) {
  const boton = factory.crearBoton();
  const checkbox = factory.crearCheckbox();

  boton.render();
  checkbox.render();
}

const windowsUI = new WindowsFactory();
renderUI(windowsUI);
```

## PROTOTYPE

Consiste en crear nuevos objetos copiando (clonando) un objeto existente, en lugar de instanciarlos directamente con new.

Sirve para:

- Evitar la creación costosa de objetos desde cero.
- Crear objetos con la misma configuración inicial.
- Mantener la independencia de las clases concretas.

```jsx
// Uso
const guerreroBase = new Personaje();

// Creamos clones
const guerrero1 = guerreroBase.clone();
```

## SINGLETON

Asegura que **una clase tenga una única instancia en todo el programa**, y proporciona un **punto de acceso global** a esa instancia.

Se utiliza cuando:

- Solo debe existir **un objeto** de esa clase (por ejemplo: un registro de logs, configuración global, conexión a base de datos, etc.).
- Queremos evitar múltiples instancias que podrían causar inconsistencias.

```jsx
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance; // Retorna la misma instancia si ya existe
    }
    Singleton.instance = this;
    this.value = Math.random(); // solo para ver que no cambia
  }
}

// Probamos
const obj1 = new Singleton();
const obj2 = new Singleton();

console.log(obj1 === obj2); // true
console.log(obj1.value, obj2.value); // mismo número
```

## FACTORY FUNCTION

Se encarga de **crear objetos sin exponer directamente el constructor**.

En lugar de usar `new`, tenemos una función que "fabrica" y devuelve el objeto adecuado.

Se usa cuando:

- Queremos encapsular la lógica de creación.
- Necesitamos crear distintos **tipos de objetos** dependiendo de parámetros.
- Queremos hacer el código más flexible y fácil de mantener.

```jsx
function crearPersona(nombre, edad) {
  return {
    nombre,
    edad,
    saludar() {
      console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    },
  };
}

// Uso
const persona1 = crearPersona("Ana", 25);
const persona2 = crearPersona("Luis", 30);

persona1.saludar(); // Hola, soy Ana y tengo 25 años.
persona2.saludar(); // Hola, soy Luis y tengo 30 años.
```
