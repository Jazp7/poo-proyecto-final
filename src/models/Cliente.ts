import { Persona } from "./Persona.js";

export class Cliente extends Persona {
  constructor(id: string, nombre: string, telefono: string, email: string) {
    super(id, nombre, telefono, email);
  }

  public obtenerIdentificacion(): string {
    return this.id;
  }

  public asociarVehiculo(placa: string): void {
    // Validación para evitar que la placa venga vacía o duplicada en el proceso
    if (!placa || placa.trim() === "") {
      console.log("[Error]: La placa proporcionada no es válida.");
      return;
    }
    
    console.log(`[Cliente]: Vehículo con placa ${placa} asociado exitosamente al cliente ${this.id}.`);
  }
}