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

  public cambiarDisponibilidad(estado: boolean): void {
    // Validamos si ya tiene el estado que se le quiere asignar para no sobreescribir 
    if (this.disponible === estado) {
      console.log(`[Mecánico]: El mecánico ${this.nombre} ya se encuentra ${estado ? 'Disponible' : 'Ocupado'}.`);
      return;
    }

    // Cambiamos el valor de la propiedad 
    this.disponible = estado;
    console.log(`[Mecánico]: Estado de ${this.nombre} cambiado a ${this.disponible ? 'Disponible' : 'Ocupado'}.`);
  }
}