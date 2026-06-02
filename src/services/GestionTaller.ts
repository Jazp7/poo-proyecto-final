import type { Cliente } from "../models/Cliente.js";
import type { Factura } from "../models/Factura.js";
import type { Mecanico } from "../models/Mecanico.js";
import type { Reparacion } from "../models/Reparacion.js";
import type { Repuesto } from "../models/Repuesto.js";
import type { Vehiculo } from "../models/Vehiculo.js";

export class GestionTaller {
  private clientes: Cliente[];
  private mecanicos: Mecanico[];
  private vehiculos: Vehiculo[];
  private repuestos: Repuesto[];
  private reparaciones: Reparacion[];
  private facturas: Factura[];

  constructor(
    clientes: Cliente[],
    mecanicos: Mecanico[],
    vehiculos: Vehiculo[],
    repuestos: Repuesto[],
    reparaciones: Reparacion[],
    facturas: Factura[],
  ) {
    this.clientes = clientes;
    this.mecanicos = mecanicos;
    this.vehiculos = vehiculos;
    this.repuestos = repuestos;
    this.reparaciones = reparaciones;
    this.facturas = facturas;
  }

  registrarCliente(cliente: Cliente): void {}

  registrarVehiculo(vehiculo: Vehiculo): void {}

  registrarMecanico(mecanico: Mecanico): void {}

  registrarRepuesto(repuesto: Repuesto): void {}

  iniciarReparacion(
    placa: string,
    idMecanico: string,
    descripcion: string,
    manoObra: number,
  ): void {}

  asignarRepuestoAReparacion(
    idReparacion: string,
    idRepuesto: string,
    cant: number,
  ): void {}

  finalizarYFacturarReparacion(idReparacion: string): Factura {}

  consultarHIstorialVehiculo(placa: string): Reparacion[] {}
}
