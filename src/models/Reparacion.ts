import { Repuesto } from "./Repuesto.js";

export class Reparacion {
  public id: string;
  public placaVehiculo: string;
  public idMecanico: string;
  public descripcionProblema: string;
  public estado: string = "En Proceso";
  public costoManoObra: number;

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
    console.log(`[Reparación]: Agregados ${cantidad} unidades de repuesto a la orden ${this.id}.`);
  }

 
  public actualizarEstado(nuevoEstado: string): void {
    this.estado = nuevoEstado;
  }

  public calcularCostoTotal(): number {
    return this.costoManoObra;
  }
}