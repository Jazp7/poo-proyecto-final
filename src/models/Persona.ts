export abstract class Persona {
  protected id: string
  protected nombre: string
  protected telefono: string
  protected email: string

  constructor(id: string, nombre: string, telefono: string, email: string) {
    this.id = id
    this.nombre = nombre
    this.telefono = telefono
    this.email = email
  }

  abstract obtenerIdentificacion(): string
}
