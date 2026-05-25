# Sistema de Gestión para Taller Mecánico — AutoService Express

Este es el proyecto integrador final para la materia de **Programación Orientada a Objetos (POO)** del Ciclo 01-2026 en la **Universidad de Oriente**. El objetivo es desarrollar una solución de backend en modo consola utilizando TypeScript y Node.js que resuelva las necesidades operativas de un taller mecánico real.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
* [pnpm](https://pnpm.io/) (Gestor de paquetes recomendado para el proyecto)

---

## Configuración del Proyecto

Sigue estos pasos para configurar el entorno local de desarrollo:

0. **Instalar pnpm:**
   ```bash
   npm install -g pnpm
   ```

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Ejecutar la aplicación en modo desarrollo:**
   ```bash
   pnpm run dev
   ```

3. **Ejecutar las pruebas unitarias (Jest):**
   ```bash
   pnpm run test
   ```

---

## Documentación del Proyecto

Para entender la estructura y el flujo de trabajo del equipo, revisa los siguientes archivos en la carpeta `docs/`:

* **[Roles y Responsabilidades](docs/roles.md):** Tareas asignadas a cada miembro del equipo y entregables transversales.
* **[Arquitectura de Software](docs/ARCHITECTURE.md):** Explicación del diseño modular de carpetas, flujo de operación y el diagrama de clases del sistema.
* **[Diagrama de Clases UML](docs/class-diagram.md):** Vista gráfica detallada de las entidades y relaciones del dominio del negocio.

---

## Equipo de Desarrollo

* **Software Developer Architect:** Aristides
* **Core Entity & Inheritance Developer (Clientes y Mecánicos):** Integrante 2
* **Fleet & Vehicle Specialization Engineer:** Integrante 3
* **Business Logic & Parts Inventory Developer:** Integrante 4
* **Memory Orchestration & Billing System Developer:** Integrante 5
* **Console UX & Exception Flow Specialist:** Integrante 6

---

## Contexto del Caso Práctico (AutoService Express)

El taller mecánico administra sus operaciones y reparaciones. Actualmente presentan problemas como:
* Pérdida de historial de reparaciones.
* Mala organización de clientes.
* Confusión en repuestos utilizados.
* Falta de control de facturación.

El sistema resuelve estas problemáticas mediante módulos de registro de clientes/vehículos, asignación de mecánicos, control de inventario de repuestos, cálculo automatizado de costos e impresión de facturas formateadas por terminal.