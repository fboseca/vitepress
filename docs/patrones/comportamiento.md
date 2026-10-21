# Comportamiento

## CHAIN OF RESPONSIBILITY

Pasa una petición a través de una **cadena de manejadores**, hasta que uno la procese.

```jsx
class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }
  handle(request) {
    if (this.next) return this.next.handle(request);
  }
}

class SoporteBasico extends Handler {
  handle(request) {
    if (request === "pregunta simple") {
      console.log("Soporte básico lo resolvió ");
    } else {
      super.handle(request);
    }
  }
}
class SoporteAvanzado extends Handler {
  handle(request) {
    if (request === "problema técnico") {
      console.log("Soporte avanzado lo resolvió ");
    } else {
      super.handle(request);
    }
  }
}

// Uso
const soporte = new SoporteBasico();
soporte.setNext(new SoporteAvanzado());
soporte.handle("pregunta simple");
soporte.handle("problema técnico");
```

## COMMAND

Encapsula una petición como un objeto, permitiendo **deshacer, reintentar o guardar comandos**.

```jsx
class Luz {
  encender() {
    console.log("Luz encendida");
  }
  apagar() {
    console.log("Luz apagada");
  }
}

class EncenderLuzCommand {
  constructor(luz) {
    this.luz = luz;
  }
  ejecutar() {
    this.luz.encender();
  }
}
class ApagarLuzCommand {
  constructor(luz) {
    this.luz = luz;
  }
  ejecutar() {
    this.luz.apagar();
  }
}

// Uso
const luz = new Luz();
const encender = new EncenderLuzCommand(luz);
const apagar = new ApagarLuzCommand(luz);

encender.ejecutar();
apagar.ejecutar();
```

## ITERATOR

Permite recorrer una colección sin exponer su estructura interna.

```jsx
class Coleccion {
  constructor(items) {
    this.items = items;
  }
  Symbol.iterator {
    let i = 0, items = this.items;
    return {
      next() {
        return i < items.length ? { value: items[i++], done: false } : { done: true };
      }
    };
  }
}

// Uso
const numeros = new Coleccion([1, 2, 3]);
for (const n of numeros) console.log(n);

```

## MEDIATOR

Define un objeto que centraliza la comunicación entre múltiples objetos, reduciendo dependencias.

```jsx
class ChatRoom {
  enviar(mensaje, usuario) {
    console.log(`[${usuario}]: ${mensaje}`);
  }
}

class Usuario {
  constructor(nombre, chat) {
    this.nombre = nombre;
    this.chat = chat;
  }
  enviar(mensaje) {
    this.chat.enviar(mensaje, this.nombre);
  }
}

// Uso
const chat = new ChatRoom();
const ana = new Usuario("Ana", chat);
const juan = new Usuario("Juan", chat);

ana.enviar("Hola!");
juan.enviar("¡Buenas!");
```

## MEMENTO

Guarda y restaura el **estado** de un objeto sin exponer sus detalles internos.

```jsx
class Editor {
  constructor() {
    this.texto = "";
  }
  escribir(palabra) {
    this.texto += palabra;
  }
  guardar() {
    return this.texto;
  }
  restaurar(memento) {
    this.texto = memento;
  }
}

// Uso
const editor = new Editor();
editor.escribir("Hola ");
const memento = editor.guardar();
editor.escribir("Mundo!");
console.log(editor.texto); // Hola Mundo!
editor.restaurar(memento);
console.log(editor.texto); // Hola
```

## OBSERVER

Un objeto (**sujeto**) notifica cambios a múltiples **observadores**.

```jsx
class Subject {
  constructor() {
    this.observers = [];
  }
  suscribir(obs) {
    this.observers.push(obs);
  }
  notificar(data) {
    this.observers.forEach((o) => o(data));
  }
}

// Uso
const subject = new Subject();
subject.suscribir((data) => console.log("Observer 1:", data));
subject.suscribir((data) => console.log("Observer 2:", data));

subject.notificar("Cambio detectado!");
```

## STATE

Permite que un objeto cambie su comportamiento cuando cambia su estado interno.

```jsx
class Semaforo {
  constructor() {
    this.estado = new Rojo(this);
  }
  setEstado(estado) {
    this.estado = estado;
  }
  cambiar() {
    this.estado.cambiar();
  }
}
class Rojo {
  constructor(semaforo) {
    this.semaforo = semaforo;
  }
  cambiar() {
    console.log("Rojo → Verde");
    this.semaforo.setEstado(new Verde(this.semaforo));
  }
}
class Verde {
  constructor(semaforo) {
    this.semaforo = semaforo;
  }
  cambiar() {
    console.log("Verde → Amarillo");
    this.semaforo.setEstado(new Amarillo(this.semaforo));
  }
}
class Amarillo {
  constructor(semaforo) {
    this.semaforo = semaforo;
  }
  cambiar() {
    console.log("Amarillo → Rojo");
    this.semaforo.setEstado(new Rojo(this.semaforo));
  }
}

// Uso
const semaforo = new Semaforo();
semaforo.cambiar(); // Rojo → Verde
semaforo.cambiar(); // Verde → Amarillo
semaforo.cambiar(); // Amarillo → Rojo
```

## STRATEGY

Define una familia de algoritmos y permite intercambiarlos dinámicamente.

```jsx
class Sumar {
  ejecutar(a, b) {
    return a + b;
  }
}
class Restar {
  ejecutar(a, b) {
    return a - b;
  }
}
class Calculadora {
  setEstrategia(estrategia) {
    this.estrategia = estrategia;
  }
  operar(a, b) {
    return this.estrategia.ejecutar(a, b);
  }
}

// Uso
const calc = new Calculadora();
calc.setEstrategia(new Sumar());
console.log(calc.operar(5, 3)); // 8
calc.setEstrategia(new Restar());
console.log(calc.operar(5, 3)); // 2
```

## TEMPLATE METHOD

Define la estructura de un algoritmo, dejando que las subclases implementen los pasos específicos.

```jsx
class CreadorDocumento {
  crear() {
    this.abrir();
    this.escribir();
    this.cerrar();
  }
  abrir() {
    console.log("Abrir documento");
  }
  escribir() {} // se redefine
  cerrar() {
    console.log("Cerrar documento");
  }
}

class PDF extends CreadorDocumento {
  escribir() {
    console.log("Escribiendo en PDF");
  }
}

// Uso
new PDF().crear();
```

## VISITOR

Permite agregar operaciones a objetos de una jerarquía **sin modificar sus clases**.

```jsx
class Circulo {
  accept(visitor) {
    visitor.visitCirculo(this);
  }
}
class Cuadrado {
  accept(visitor) {
    visitor.visitCuadrado(this);
  }
}

class DibujarVisitor {
  visitCirculo(c) {
    console.log("Dibujando un círculo ");
  }
  visitCuadrado(c) {
    console.log("Dibujando un cuadrado ");
  }
}

// Uso
const figuras = [new Circulo(), new Cuadrado()];
const dibujar = new DibujarVisitor();
figuras.forEach((f) => f.accept(dibujar));
```
