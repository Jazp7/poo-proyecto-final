import { Repuesto } from "./Repuesto.js";

export class Reparacion {
  public id: string;
  public placaVehiculo: string;
  public idMecanico: string;
  public descripcionProblema: string;
  public estado: string = "En Proceso";
  public costoManoObra: number;
  private repuestosAsignados: { repuesto: Repuesto; cantidad: number }[] = [];

  constructor(
    id: string,
    placaVehiculo: string,
    idMecanico: string,
    descripcionProblema: string,
    costoManoObra: number
  ) {
    this.id = id;
    this.placaVehiculo = placaVehiculo;
    this.idMecanico = idMecanico;
    this.descripcionProblema = descripcionProblema;
    this.costoManoObra = costoManoObra;
  }

  public agregarRepuesto(repuesto: Repuesto, cantidad: number): void {
    const asignacionExistente = this.repuestosAsignados.find(
      (item) => item.repuesto.obtenerId() === repuesto.obtenerId()
    );

    if (asignacionExistente) {
      asignacionExistente.cantidad += cantidad;
    } else {
      this.repuestosAsignados.push({ repuesto, cantidad });
    }

    console.log(`[Reparación]: Agregados ${cantidad} unidades de repuesto a la orden ${this.id}.`);
  }

  public actualizarEstado(nuevoEstado: string): void {
    this.estado = nuevoEstado;
  }

  public getRepuestosAsignados(): { repuesto: Repuesto; cantidad: number }[] {
    return this.repuestosAsignados;
  }

  public calcularCostoTotal(): number {
    const costoRepuestos = this.repuestosAsignados.reduce(
      (acumulado, item) => acumulado + item.repuesto.obtenerPrecio() * item.cantidad,
      0
    );
    return this.costoManoObra + costoRepuestos;
  }
}