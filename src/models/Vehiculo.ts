export abstract class Vehiculo {
  protected placa: string
  protected marca: string
  protected modelo: string
  protected anio: number
  protected clienteId: string

  constructor(placa: string, marca: string, modelo: string, anio: number, clienteId: string) {
    this.placa = placa
    this.marca = marca
    this.modelo = modelo
    this.anio = anio
    this.clienteId = clienteId
  }

  abstract obtenerTipo(): string
}
