# Roles del proyecto

## Software Developer Architect
- **Responsabilidad Principal:** Diseño de clases y arquitectura, y creación del diagrama de clases.

- **Tareas de Código:**
  - Configurar el entorno inicial del proyecto en Node.js, TypeScript, `ts-node` y `pnpm`
  - Organizar la estructura modular de carpetas en el directorio `src/`
  - Programar las clases abstractas base: `abstract class Persona` y `abstract class Vehiculo` con sus respectivos constructores y encapsulamiento.
- **Aporte a la Documentación:** Redactar la Introducción, Planteamiento del Problema y Justificación del documento escrito

## Core Entity & Inheritance Developer (Clientes y Mecánicos)
- **Responsabilidad Principal:** Implementación de herencia, polimorfismo y encapsulamiento en las entidades de personas.

- **Tareas de Código:**
  - Desarrollar las clases hijas `Cliente` y `Mecanico` que heredan de `Persona`.
  - Programar la lógica de polimorfismo sobrescribiendo el método abstracto `obtenerIdentificacion()`.
  - Implementar los métodos para asociar vehículos a los clientes y cambiar la disponibilidad de los mecánicos.
- **Aporte a la Documentación:** Diseñar el Diagrama de Clases oficial del sistema para el reporte.

## Fleet & Vehicle Specialization Engineer
- **Responsabilidad Principal:** Implementación de herencia, polimorfismo y encapsulamiento de vehículos.

- **Tareas de Código:**
  - Desarrollar las clases hijas de vehículos: `Sedan` y `Moto` (con opción a expandir a `Camioneta` o `Camion`) que heredan de `Vehiculo`.
  - Implementar el método polimórfico `obtenerTipo()` en cada clase de vehículo.
  - Asegurar el correcto uso de modificadores de acceso (`protected` / `private`) para cumplir con el encapsulamiento exigido.
- **Aporte a la Documentación:** Redactar la sección de "Explicación de herencia y polimorfismo" del reporte.

## Business Logic & Parts Inventory Developer
- **Responsabilidad Principal:** Desarrollo de la lógica de negocio central y control de inventario de repuestos.

- **Tareas de Código:**
  - Desarrollar la clase `Repuesto` para solucionar la problemática de descontrol de piezas del taller.
  - Desarrollar la clase `Reparacion` para controlar el historial, estado del servicio ('Pendiente', 'En Progreso', 'Completado') y el cálculo de costos totales (mano de obra + repuestos).
  - Implementar los métodos para agregar repuestos y actualizar los estados del servicio técnico.
- **Aporte a la Documentación:** Redactar la "Descripción del caso práctico asignado" y la "Explicación de clases y módulos" de su sección.

## Billing System Developer
- **Responsabilidad Principal:** Desarrollo de lógica de negocio, facturación.

- **Tareas de Código:**
  - Desarrollar la clase `Factura` con su respectivo método para generar detalles formateados listos para la terminal.
  - Desarrollar la clase maestra/orquestadora `GestionTaller`, la cual contendrá los arreglos (`arrays`) que simulan el almacenamiento de datos en la memoria RAM.
  - Programar las funciones de registro y consultas, tales como `consultarHistorialVehiculo(placa)`.
- **Aporte a la Documentación:** Recopilar y estructurar las "Capturas del sistema" en la consola una vez integrado todo el código.

## Console UX & Exception Flow Specialist
- **Responsabilidad Principal:** Manejo de excepciones, validaciones de datos e interfaz de usuario en consola.

- **Tareas de Código:**
  - **(Opcional)** Crear las clases de errores personalizados heredando de la clase nativa `Error` (ej., `StockInsuficienteError`, `VehiculoInexistenteError`).
  - Implementar bloques `try-catch` y lanzar errores con `throw new Error()` en los métodos críticos del sistema.
  - Desarrollar el menú interactivo por consola en Node.js que conecte al usuario con las funciones de `GestionTaller` (utilizando `ReadLine`).
- **Aporte a la Documentación:** Escribir el apartado de "Dificultades encontradas y soluciones aplicadas".

---

# Estrategia de Calidad y Entregables Transversales

Para garantizar la nota máxima en los criterios de la rúbrica, el equipo adoptará las siguientes prácticas conjuntas:

- **Pruebas Unitarias (Jest):** Aunque el Software Developer Architect y el Console UX & Exception Flow Specialist apoyarán en la configuración de Jest, cada integrante será responsable de programar al menos 2 pruebas unitarias para las clases que codificó. Esto asegurará alcanzar fácilmente el mínimo de 10 pruebas requeridas y garantizará que todos entiendan cómo testear casos válidos, inválidos y excepciones.
- **Documentación Escrita (Mínimo 10 páginas):** Se creará un documento compartido (en la nube) con formato Arial/Times New Roman 12, interlineado 1.5 y texto justificado. Cada integrante redactará su sección asignada. El Memory Orchestration & Billing System Developer coordinará la unificación de conclusiones y recomendaciones generales.
- **Presentación y Defensa (Feria de Proyectos):** El equipo completo creará el material en PowerPoint o Canva. Dado que el docente evaluará la comprensión individual mediante preguntas directas de código, realizaremos una sesión interna de revisión (repaso cruzado) antes del 12 de junio para que todos los miembros puedan explicar cualquier módulo del sistema con fluidez.