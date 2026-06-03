import { Persona } from "./Persona.js";

export class Mecanico extends Persona {
  public disponible: boolean = true;
  private especialidad: string;

  constructor(id: string, nombre: string, telefono: string, email: string, especialidad: string) {
    super(id, nombre, telefono, email);
    this.especialidad = especialidad;
  }

  public obtenerIdentificacion(): string {
    return this.id;
  }

  public cambiarDisponibilidad(estado: boolean): void {}
}