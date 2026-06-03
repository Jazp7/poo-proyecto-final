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

  public agregarRepuesto(repuesto: Repuesto, cantidad: number): void {}

  public actualizarEstado(nuevoEstado: string): void {}

  public calcularCostoTotal(): number {
    return 0;
  }
}