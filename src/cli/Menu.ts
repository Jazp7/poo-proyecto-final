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

  private preguntar(pregunta: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(pregunta, resolve);
    });
  }

  async iniciar(): Promise<void> {
    let opcion = "";
    while (opcion !== "0") {
      this.mostrarOpciones();
      opcion = await this.preguntar("\nSeleccione una opción: ");
      try {
        switch (opcion) {
          case "1":
            await this.registrarClienteHandler();
            break;
          case "2":
            await this.registrarVehiculoHandler();
            break;
          case "3":
            await this.registrarMecanicoHandler();
            break;
          case "4":
            await this.registrarRepuestoHandler();
            break;
          case "5":
            await this.iniciarReparacionHandler();
            break;
          case "6":
            await this.asignarRepuestoHandler();
            break;
          case "7":
            await this.finalizarYFacturarHandler();
            break;
          case "8":
            await this.consultarHistorialHandler();
            break;
          case "9":
            await this.listarClientesHandler();
            break;
          case "0":
            console.log("Saliendo del sistema...");
            break;
          default:
            console.log("Opción no válida.");
        }
      } catch (error) {
        this.mostrarError(error as Error);
      }
    }
    this.rl.close();
  }

  private mostrarOpciones(): void {
    console.log("\n=== AutoService Express ===");
    console.log("1. Registrar cliente");
    console.log("2. Registrar vehículo");
    console.log("3. Registrar mecánico");
    console.log("4. Agregar repuesto");
    console.log("5. Iniciar reparación");
    console.log("6. Asignar repuesto a reparación");
    console.log("7. Finalizar y facturar reparación");
    console.log("8. Consultar historial de vehículo");
    console.log("9. Listar clientes");
    console.log("0. Salir");
  }

  private async registrarClienteHandler(): Promise<void> {
    const id = await this.preguntar("ID del cliente: ");
    const nombre = await this.preguntar("Nombre: ");
    const telefono = await this.preguntar("Teléfono: ");
    const email = await this.preguntar("Email: ");
    const cliente = new Cliente(id, nombre, telefono, email);
    this.taller.registrarCliente(cliente);
    console.log("Cliente registrado exitosamente.");
  }

  private async registrarVehiculoHandler(): Promise<void> {
    const tipo = await this.preguntar("Tipo (1. Sedán | 2. Moto): ");
    const placa = await this.preguntar("Placa: ");
    const marca = await this.preguntar("Marca: ");
    const modelo = await this.preguntar("Modelo: ");
    const anio = Number.parseInt(await this.preguntar("Año: "), 10);
    const clienteId = await this.preguntar("ID del cliente propietario: ");

    let vehiculo: Vehiculo;
    if (tipo === "1") {
      const nroPuertas = Number.parseInt(
        await this.preguntar("Número de puertas: "),
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
        await this.preguntar("Cilindrada (cc): "),
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
    this.taller.registrarVehiculo(vehiculo);
    console.log("Vehículo registrado exitosamente.");
  }

  private async registrarMecanicoHandler(): Promise<void> {
    const id = await this.preguntar("ID del mecánico: ");
    const nombre = await this.preguntar("Nombre: ");
    const telefono = await this.preguntar("Teléfono: ");
    const email = await this.preguntar("Email: ");
    const especialidad = await this.preguntar("Especialidad: ");
    const mecanico = new Mecanico(id, nombre, telefono, email, especialidad);
    this.taller.registrarMecanico(mecanico);
    console.log("Mecánico registrado exitosamente.");
  }

  private async registrarRepuestoHandler(): Promise<void> {
    const id = await this.preguntar("ID del repuesto: ");
    const nombre = await this.preguntar("Nombre: ");
    const precio = Number.parseFloat(await this.preguntar("Precio: "));
    const stock = Number.parseInt(await this.preguntar("Stock inicial: "), 10);
    const repuesto = new Repuesto(id, nombre, precio, stock);
    this.taller.registrarRepuesto(repuesto);
    console.log("Repuesto agregado exitosamente.");
  }

  private async iniciarReparacionHandler(): Promise<void> {
    const placa = await this.preguntar("Placa del vehículo: ");
    const idMecanico = await this.preguntar("ID del mecánico: ");
    const descripcion = await this.preguntar("Descripción del problema: ");
    const manoObra = Number.parseFloat(
      await this.preguntar("Costo de mano de obra: ")
    );
    this.taller.iniciarReparacion(placa, idMecanico, descripcion, manoObra);
    console.log("Reparación iniciada.");
  }

  private async asignarRepuestoHandler(): Promise<void> {
    const idReparacion = await this.preguntar("ID de la reparación: ");
    const idRepuesto = await this.preguntar("ID del repuesto: ");
    const cantidad = Number.parseInt(await this.preguntar("Cantidad: "), 10);
    this.taller.asignarRepuestoAReparacion(
      idReparacion,
      idRepuesto,
      cantidad
    );
    console.log("Repuesto asignado.");
  }

  private async finalizarYFacturarHandler(): Promise<void> {
    const idReparacion = await this.preguntar("ID de la reparación: ");
    const factura = this.taller.finalizarYFacturarReparacion(idReparacion);
    this.mostrarFactura(factura);
  }

  private async consultarHistorialHandler(): Promise<void> {
    const placa = await this.preguntar("Placa del vehículo: ");
    const historial = this.taller.consultarHistorialVehiculo(placa);
    this.mostrarHistorial(historial);
  }

  private async listarClientesHandler(): Promise<void> {
    const clientes = this.taller.obtenerClientes();
    if (clientes.length === 0) {
      console.log("No hay clientes registrados.");
      return;
    }
    for (const c of clientes) {
      console.log(`[${c.id}] ${c.nombre} — ${c.telefono} — ${c.email}`);
    }
  }

  private mostrarFactura(factura: Factura): void {
    const detalle = factura.generarDetalleFactura();
    if (detalle) console.log(detalle);
  }

  private mostrarHistorial(reparaciones: Reparacion[]): void {
    if (reparaciones.length === 0) {
      console.log("No hay reparaciones registradas para este vehículo.");
      return;
    }
    for (const r of reparaciones) {
      console.log(
        `Reparación ${r.id}: ${r.estado} | Costo total: $${r.calcularCostoTotal()}`
      );
    }
  }

  private mostrarError(error: Error): void {
    console.log(`Error: ${error.message}`);
  }
}
