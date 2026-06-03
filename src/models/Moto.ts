import { Vehiculo } from "./Vehiculo.js";

export class Moto extends Vehiculo {
  private cilindrada: number;

  constructor(
    placa: string,
    marca: string,
    modelo: string,
    anio: number,
    clienteId: string,
    cilindrada: number
  ) {
    super(placa, marca, modelo, anio, clienteId);
    this.cilindrada = cilindrada;
  }

  public obtenerTipo(): string {
    return "Moto";
  }
}