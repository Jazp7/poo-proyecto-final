import { Persona } from "./Persona.js";

export class Cliente extends Persona {
  private placasVehiculos: string[] = [];

  constructor(id: string, nombre: string, telefono: string, email: string) {
    super(id, nombre, telefono, email);
  }

  public obtenerIdentificacion(): string {
    return this.id;
  }

  public getPlacasVehiculos(): string[] {
    return this.placasVehiculos;
  }

  public asociarVehiculo(placa: string): void {
    // Validación para evitar que la placa venga vacía o duplicada en el proceso
    if (!placa || placa.trim() === "") {
      console.log("[Error]: La placa proporcionada no es válida.");
      return;
    }

    const placaLimpia = placa.trim();
    if (this.placasVehiculos.includes(placaLimpia)) {
      console.log(`[Cliente]: El vehículo con placa ${placaLimpia} ya está asociado al cliente ${this.id}.`);
      return;
    }
    
    this.placasVehiculos.push(placaLimpia);
    console.log(`[Cliente]: Vehículo con placa ${placaLimpia} asociado exitosamente al cliente ${this.id}.`);
  }
}
