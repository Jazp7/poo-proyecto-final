import type { GestionTaller } from "../services/GestionTaller.js";
import { Cliente } from "../models/Cliente.js";
import { Mecanico } from "../models/Mecanico.js";
import { Sedan } from "../models/Sedan.js";
import { Moto } from "../models/Moto.js";
import { Repuesto } from "../models/Repuesto.js";
import { Vehiculo } from "../models/Vehiculo.js";
import { Reparacion } from "../models/Reparacion.js";
import { Factura } from "../models/Factura.js";

import readline from "node:readline";

import chalk from "chalk";

export class Menu {
  private taller: GestionTaller;
  private rl: readline.Interface;

  constructor(taller: GestionTaller) {
    this.taller = taller;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // Métodos auxiliares
  private preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(pregunta, resolve);
    });
  }

  private titulo(texto: string): void {
    console.log(chalk.whiteBright.bold(`\n====== ${texto} ======`));
  }

  private imprimirTabla(headers: string[], rows: string[][], rawRows: string[][]): void {
    const colWidths = headers.map((h, i) => {
      const rowLengths = rawRows.map(r => {
        if (!r || typeof r[i] !== "string") return 0;
        return r[i].length;
      });
      return Math.max(h.length, ...rowLengths) + 2; // +2 para dar margen de al menos 1 espacio en cada lado
    });

    const crearLineaSeparadora = (izq: string, centro: string, der: string, linea: string) => {
      return izq + colWidths.map(w => linea.repeat(w)).join(centro) + der;
    };

    // Bordes superiores
    console.log(chalk.gray(crearLineaSeparadora("┌", "┬", "┐", "─")));

    // Encabezados
    const headerCells = headers.map((h, i) => {
      const width = colWidths[i] ?? (h.length + 2);
      const padding = width - h.length - 1;
      return " " + chalk.whiteBright.bold(h) + " ".repeat(padding >= 0 ? padding : 0);
    });
    console.log(chalk.gray("│") + headerCells.join(chalk.gray("│")) + chalk.gray("│"));

    // Separador de encabezados
    console.log(chalk.gray(crearLineaSeparadora("├", "┼", "┤", "─")));

    // Filas
    rows.forEach((row, rowIndex) => {
      const cells = row.map((cell, colIndex) => {
        const rawRow = rawRows[rowIndex];
        const rawCell = rawRow && typeof rawRow[colIndex] === "string" ? rawRow[colIndex] : "";
        const width = colWidths[colIndex] ?? (rawCell.length + 2);
        const padding = width - rawCell.length - 1;
        return " " + cell + " ".repeat(padding >= 0 ? padding : 0);
      });
      console.log(chalk.gray("│") + cells.join(chalk.gray("│")) + chalk.gray("│"));
    });

    // Bordes inferiores
    console.log(chalk.gray(crearLineaSeparadora("└", "┴", "┘", "─")));
  }

  private pausar(mensaje: string = "Presione Enter " + chalk.whiteBright.bold("para continuar...")): Promise<void> {
    return new Promise((resolve) => {
      this.rl.question(mensaje, () => resolve());
    });
  }

  // Métodos de inicio y manejo de opciones
  async iniciar(): Promise<void> {
    console.clear();
    let opcion = "";
    while (opcion !== "0") {
      this.mostrarOpciones();
      opcion = await this.preguntar(chalk.whiteBright.bold("\nSeleccione una opción: "));
      try {
        switch (opcion) {
          case "1":
            console.clear();
            await this.registrarClienteHandler();
            await this.pausar();
            break;
          case "2":
            console.clear();
            await this.registrarVehiculoHandler();
            await this.pausar();
            break;
          case "3":
            console.clear();
            await this.registrarMecanicoHandler();
            await this.pausar();
            break;
          case "4":
            console.clear();
            await this.registrarRepuestoHandler();
            await this.pausar();
            break;
          case "5":
            console.clear();
            await this.iniciarReparacionHandler();
            await this.pausar();
            break;
          case "6":
            console.clear();
            await this.asignarRepuestoHandler();
            await this.pausar();
            break;
          case "7":
            console.clear();
            await this.finalizarYFacturarHandler();
            await this.pausar();
            break;
          case "8":
            console.clear();
            await this.consultarHistorialHandler();
            await this.pausar();
            break;
          case "9":
            console.clear();
            await this.listarClientesHandler();
            await this.pausar();
            break;
          case "10":
            console.clear();
            await this.listarVehiculosHandler();
            await this.pausar();
            break;
          case "11":
            console.clear();
            await this.listarMecanicosHandler();
            await this.pausar();
            break;
          case "12":
            console.clear();
            await this.listarRepuestosHandler();
            await this.pausar();
            break;
          case "13":
            console.clear();
            await this.listarReparacionesHandler();
            await this.pausar();
            break;
          case "14":
            console.clear();
            await this.listarFacturasHandler();
            await this.pausar();
            break;
          case "0":
            console.clear();
            console.log("Saliendo del sistema...");
            break;
          default:
            console.clear();
            console.log("Opción no válida.");
            await this.pausar();
        }
      } catch (error) {
        await this.mostrarError(error as Error);
      }
    }
    this.rl.close();
  }

  private mostrarOpciones(): void {
    this.titulo("Autoservice Express");
    console.log(chalk.whiteBright.bold("1. ") + "Registrar cliente");
    console.log(chalk.whiteBright.bold("2. ") + "Registrar vehículo");
    console.log(chalk.whiteBright.bold("3. ") + "Registrar mecánico");
    console.log(chalk.whiteBright.bold("4. ") + "Agregar repuesto");
    console.log(chalk.whiteBright.bold("5. ") + "Iniciar reparación");
    console.log(chalk.whiteBright.bold("6. ") + "Asignar repuesto a reparación");
    console.log(chalk.whiteBright.bold("7. ") + "Finalizar y facturar reparación");
    console.log(chalk.whiteBright.bold("8. ") + "Consultar historial de vehículo");
    console.log(chalk.whiteBright.bold("9. ") + "Listar clientes");
    console.log(chalk.whiteBright.bold("10. ") + "Listar vehículos");
    console.log(chalk.whiteBright.bold("11. ") + "Listar mecánicos");
    console.log(chalk.whiteBright.bold("12. ") + "Listar repuestos");
    console.log(chalk.whiteBright.bold("13. ") + "Listar reparaciones");
    console.log(chalk.whiteBright.bold("14. ") + "Listar facturas");
    console.log(chalk.red.bold("0. Salir"));
  }

  // Métodos handlers para cada opción del menú
  private async registrarClienteHandler(): Promise<void> {
    this.titulo("Registrar Cliente");
    const id = await this.preguntar(chalk.whiteBright.bold("ID del cliente: "));
    const nombre = await this.preguntar(chalk.whiteBright.bold("Nombre: "));
    const telefono = await this.preguntar(chalk.whiteBright.bold("Teléfono: "));
    const email = await this.preguntar(chalk.whiteBright.bold("Email: "));
    const cliente = new Cliente(id, nombre, telefono, email);
    const clienteRegistrado = this.taller.registrarCliente(cliente);
    console.log(chalk.green(`\nCliente ${clienteRegistrado.nombre} registrado exitosamente!`));
  }

  private async registrarVehiculoHandler(): Promise<void> {
    const tipo = await this.preguntar("Tipo " + chalk.whiteBright.bold("(1. Sedán | 2. Moto): "));
    const placa = await this.preguntar(chalk.whiteBright.bold("Placa: "));
    const marca = await this.preguntar(chalk.whiteBright.bold("Marca: "));
    const modelo = await this.preguntar(chalk.whiteBright.bold("Modelo: "));
    const anio = Number.parseInt(await this.preguntar(chalk.whiteBright.bold("Año: ")), 10);
    const clienteId = await this.preguntar(chalk.whiteBright.bold("ID del cliente propietario: "));

    let vehiculo: Vehiculo;
    if (tipo === "1") {
      const nroPuertas = Number.parseInt(
        await this.preguntar(chalk.whiteBright.bold("Número de puertas: ")),
        10
      );
      vehiculo = new Sedan(
        placa,
        marca,
        modelo,
        anio,
        clienteId,
        nroPuertas
      );
    } else {
      const cilindrada = Number.parseInt(
        await this.preguntar(chalk.whiteBright.bold("Cilindrada (cc): ")),
        10
      );
      vehiculo = new Moto(
        placa,
        marca,
        modelo,
        anio,
        clienteId,
        cilindrada
      );
    }
    const vehiculoRegistrado = this.taller.registrarVehiculo(vehiculo);
    console.log(chalk.green(`\nVehículo con placa ${vehiculoRegistrado['placa']} registrado exitosamente!`));
  }

  private async registrarMecanicoHandler(): Promise<void> {
    const id = await this.preguntar(chalk.whiteBright.bold("ID del mecánico: "));
    const nombre = await this.preguntar(chalk.whiteBright.bold("Nombre: "));
    const telefono = await this.preguntar(chalk.whiteBright.bold("Teléfono: "));
    const email = await this.preguntar(chalk.whiteBright.bold("Email: "));
    const especialidad = await this.preguntar(chalk.whiteBright.bold("Especialidad: "));
    const mecanico = new Mecanico(id, nombre, telefono, email, especialidad);
    const mecanicoRegistrado = this.taller.registrarMecanico(mecanico);
    console.log(chalk.green(`\nMecánico ${mecanicoRegistrado.nombre} registrado exitosamente!`));
  }

  private async registrarRepuestoHandler(): Promise<void> {
    const id = await this.preguntar(chalk.whiteBright.bold("ID del repuesto: "));
    const nombre = await this.preguntar(chalk.whiteBright.bold("Nombre: "));
    const precio = Number.parseFloat(await this.preguntar(chalk.whiteBright.bold("Precio: ")));
    const stock = Number.parseInt(await this.preguntar(chalk.whiteBright.bold("Stock inicial: ")), 10);
    const repuesto = new Repuesto(id, nombre, precio, stock);
    const repuestoRegistrado = this.taller.registrarRepuesto(repuesto);
    console.log(chalk.green(`\nRepuesto ${repuestoRegistrado.nombre} registrado exitosamente!`));
  }

  private async iniciarReparacionHandler(): Promise<void> {
    const placa = await this.preguntar(chalk.whiteBright.bold("Placa del vehículo: "));
    const idMecanico = await this.preguntar(chalk.whiteBright.bold("ID del mecánico: "));
    const descripcion = await this.preguntar(chalk.whiteBright.bold("Descripción del problema: "));
    const manoObra = Number.parseFloat(
      await this.preguntar(chalk.whiteBright.bold("Costo de mano de obra: "))
    );
    const reparacion = this.taller.iniciarReparacion(placa, idMecanico, descripcion, manoObra);
    console.log(chalk.green(`\nOrden: ${reparacion.id} creada con éxito para el vehículo [${reparacion.placaVehiculo}]!`));
  }

  private async asignarRepuestoHandler(): Promise<void> {
    const idReparacion = await this.preguntar(chalk.whiteBright.bold("ID de la reparación: "));
    const idRepuesto = await this.preguntar(chalk.whiteBright.bold("ID del repuesto: "));
    const cantidad = Number.parseInt(await this.preguntar(chalk.whiteBright.bold("Cantidad: ")), 10);
    const asignacion = this.taller.asignarRepuestoAReparacion(
      idReparacion,
      idRepuesto,
      cantidad
    );
    console.log(chalk.green(`\nSe agregaron ${asignacion.cantidad} unidades de ${asignacion.repuesto.nombre} a la orden ${asignacion.reparacion.id}!`));
  }

  private async finalizarYFacturarHandler(): Promise<void> {
    const idReparacion = await this.preguntar(chalk.whiteBright.bold("ID de la reparación: "));
    const factura = this.taller.finalizarYFacturarReparacion(idReparacion);
    console.log(chalk.green(`\nOrden: ${idReparacion} cerrada. Factura ${factura.getIdFactura()} emitida correctamente!`));
    this.mostrarFactura(factura);
  }

  private async consultarHistorialHandler(): Promise<void> {
    const placa = await this.preguntar(chalk.whiteBright.bold("Placa del vehículo: "));
    const historial = this.taller.consultarHistorialVehiculo(placa);
    if (historial.length > 0) {
      console.log(chalk.green(`\nSe encontraron ${historial.length} órdenes de servicio para la placa [${placa}].`));
    }
    this.mostrarHistorial(historial);
  }

  private async listarClientesHandler(): Promise<void> {
    const clientes = this.taller.clientes;
    if (clientes.length === 0) {
      console.log(chalk.red("No hay clientes registrados."));
      return;
    }
    this.titulo("Clientes Registrados");
    const headers = ["ID", "Nombre", "Teléfono", "Email"];
    const rows = clientes.map(c => [c.id, c.nombre, c.telefono, c.email]);
    this.imprimirTabla(headers, rows, rows);
  }

  private async listarVehiculosHandler(): Promise<void> {
    const vehiculos = this.taller.vehiculos;
    if (vehiculos.length === 0) {
      console.log(chalk.red("No hay vehículos registrados."));
      return;
    }
    this.titulo("Vehículos Registrados");
    const headers = ["Placa", "Marca", "Modelo", "Año", "Propietario ID", "Tipo", "Detalle"];
    const rows = vehiculos.map(v => {
      const tipo = v.obtenerTipo();
      const extra = tipo === "Sedan" ? `${(v as any).nroPuertas} puertas` : `${(v as any).cilindrada} cc`;
      return [
        (v as any).placa,
        (v as any).marca,
        (v as any).modelo,
        (v as any).anio.toString(),
        (v as any).clienteId,
        tipo,
        extra
      ];
    });
    this.imprimirTabla(headers, rows, rows);
  }

  private async listarMecanicosHandler(): Promise<void> {
    const mecanicos = this.taller.mecanicos;
    if (mecanicos.length === 0) {
      console.log(chalk.red("No hay mecánicos registrados."));
      return;
    }
    this.titulo("Mecánicos Registrados");
    const headers = ["ID", "Nombre", "Especialidad", "Estado", "Teléfono", "Email"];
    const rawRows = mecanicos.map(m => [
      m.id,
      m.nombre,
      m['especialidad'],
      m.disponible ? "Disponible" : "Ocupado",
      m.telefono,
      m.email
    ]);
    const formattedRows = mecanicos.map(m => [
      m.id,
      m.nombre,
      m['especialidad'],
      m.disponible ? chalk.green("Disponible") : chalk.red("Ocupado"),
      m.telefono,
      m.email
    ]);
    this.imprimirTabla(headers, formattedRows, rawRows);
  }

  private async listarRepuestosHandler(): Promise<void> {
    const repuestos = this.taller.repuestos;
    if (repuestos.length === 0) {
      console.log(chalk.red("No hay repuestos registrados."));
      return;
    }
    this.titulo("Inventario de Repuestos");
    const headers = ["ID", "Nombre", "Precio", "Stock"];
    const rows = repuestos.map(r => [
      r.id,
      r.nombre,
      `$${r.precio.toFixed(2)}`,
      `${r.stock} unidades`
    ]);
    this.imprimirTabla(headers, rows, rows);
  }

  private async listarReparacionesHandler(): Promise<void> {
    const reparaciones = this.taller.reparaciones;
    if (reparaciones.length === 0) {
      console.log(chalk.red("No hay reparaciones registradas."));
      return;
    }
    this.titulo("Órdenes de Reparación");
    const headers = ["ID", "Vehículo", "Mecánico", "Estado", "Mano de Obra", "Descripción"];
    const rawRows = reparaciones.map(r => [
      r.id,
      r.placaVehiculo,
      r.idMecanico,
      r.estado === "Completado" ? "Completada" : "En Proceso",
      `$${r.costoManoObra.toFixed(2)}`,
      r.descripcionProblema
    ]);
    const formattedRows = reparaciones.map(r => [
      r.id,
      r.placaVehiculo,
      r.idMecanico,
      r.estado === "Completado" ? chalk.green("Completada") : chalk.yellow("En Proceso"),
      `$${r.costoManoObra.toFixed(2)}`,
      r.descripcionProblema
    ]);
    this.imprimirTabla(headers, formattedRows, rawRows);
  }

  private async listarFacturasHandler(): Promise<void> {
    const facturas = this.taller.facturas;
    if (facturas.length === 0) {
      console.log(chalk.red("No hay facturas emitidas."));
      return;
    }
    this.titulo("Facturas Emitidas");
    const headers = ["ID Factura", "ID Reparación", "Total Pagado", "Fecha Emisión"];
    const rows = facturas.map(f => [
      f.getIdFactura(),
      f.getIdReparacion(),
      `$${f.getTotalPagado().toFixed(2)}`,
      f.getFechaEmision().toLocaleString()
    ]);
    this.imprimirTabla(headers, rows, rows);
  }

  private mostrarFactura(factura: Factura): void {
    const detalle = factura.generarDetalleFactura();
    if (detalle) console.log(chalk.whiteBright(detalle));
  }

  private mostrarHistorial(reparaciones: Reparacion[]): void {
    if (reparaciones.length === 0) {
      console.log(chalk.red("No hay reparaciones registradas para este vehículo."));
      return;
    }
    for (const r of reparaciones) {
      console.log(
        `Reparación ${r.id}: ${r.estado} | Costo total: $${r.calcularCostoTotal()}`
      );
    }
  }

  private async mostrarError(error: Error): Promise<void> {
    console.log(chalk.red.bold(`\nError: ${error.message}`));
    await this.pausar(chalk.whiteBright.bold("Presione Enter para continuar..."));
  }
}
