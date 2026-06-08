import { Sedan } from "../../models/Sedan.js";
import { Moto } from "../../models/Moto.js";

describe("Vehiculos (Sedan & Moto) Tests", () => {
  test("should correctly instantiate Sedan and return correct type", () => {
    const sedan = new Sedan("ABC-123", "Toyota", "Corolla", 2020, "C-123", 4);
    
    // Accessing protected properties through index bypass for testing
    expect(sedan["placa"]).toBe("ABC-123");
    expect(sedan["marca"]).toBe("Toyota");
    expect(sedan["modelo"]).toBe("Corolla");
    expect(sedan["anio"]).toBe(2020);
    expect(sedan["clienteId"]).toBe("C-123");
    expect(sedan["nroPuertas"]).toBe(4);
    expect(sedan.obtenerTipo()).toBe("Sedan");
  });

  test("should correctly instantiate Moto and return correct type", () => {
    const moto = new Moto("M-999", "Yamaha", "R6", 2022, "C-123", 600);
    
    // Accessing protected properties through index bypass for testing
    expect(moto["placa"]).toBe("M-999");
    expect(moto["marca"]).toBe("Yamaha");
    expect(moto["modelo"]).toBe("R6");
    expect(moto["anio"]).toBe(2022);
    expect(moto["clienteId"]).toBe("C-123");
    expect(moto["cilindrada"]).toBe(600);
    expect(moto.obtenerTipo()).toBe("Moto");
  });
});
