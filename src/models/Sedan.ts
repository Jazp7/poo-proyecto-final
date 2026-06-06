import { Vehiculo } from "./Vehiculo.js";

export class Sedan extends Vehiculo {
  private nroPuertas: number;

  constructor(
    placa: string,
    marca: string,
    modelo: string,
    anio: number,
    clienteId: string,
    nroPuertas: number
  ) {
    super(placa, marca, modelo, anio, clienteId);
    this.nroPuertas = nroPuertas;
  }

  public obtenerTipo(): string {
    return "Sedan";
  }
}