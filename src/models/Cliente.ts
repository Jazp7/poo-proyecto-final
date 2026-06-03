import { Persona } from "./Persona.js";

export class Cliente extends Persona {
  constructor(id: string, nombre: string, telefono: string, email: string) {
    super(id, nombre, telefono, email);
  }

  public obtenerIdentificacion(): string {
    return this.id;
  }

  public asociarVehiculo(placa: string): void {}
}
