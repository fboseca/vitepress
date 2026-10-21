# Redes neuronales

Una **red neuronal artificial** es un modelo computacional inspirado en el **cerebro humano**, diseñado para **aprender patrones a partir de datos**. Se compone de **neuronas artificiales** organizadas en capas, que transforman entradas en salidas a través de **operaciones matemáticas**.

> Las redes neuronales son la base de muchos algoritmos de aprendizaje profundo (deep learning).

### Estructura básica

Una red neuronal suele tener tres tipos de capas:

1. **Capa de entrada**: recibe los datos (por ejemplo, píxeles de una imagen).
2. **Capas ocultas**: procesan la información usando pesos, sumas y funciones de activación.
3. **Capa de salida**: produce el resultado final (por ejemplo, clasificación: gato o perro).

> Cada conexión entre neuronas tiene un **peso**, y cada neurona aplica una **función de activación** (como ReLU, sigmoid, tanh).

Cada capa recibe el nombre de perceptron:

![Red neuronal](/resources/images/red_neuronal.png)

### ¿Cómo aprende una red neuronal?

1. **Propagación hacia adelante (forward pass)**: calcula la salida en función de los pesos actuales.
2. **Cálculo del error**: compara la salida con la respuesta esperada.
3. **Retropropagación (backpropagation)**: ajusta los pesos para minimizar el error usando **descenso de gradiente**.

### Ventajas

- Puede **aprender relaciones complejas y no lineales**.
- Muy potente para tareas como:
  - Visión por computador
  - Reconocimiento de voz
  - Traducción automática
  - Diagnóstico médico

### ❌ Desventajas

- Requiere **muchos datos** y poder computacional.
- Difícil de interpretar ("caja negra").
- Sensible a la **configuración de hiperparámetros** (tamaño, número de capas, tasa de aprendizaje...).
