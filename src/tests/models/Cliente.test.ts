import { jest } from "@jest/globals";
import { Cliente } from "../../models/Cliente.js";

describe("Cliente Model Tests", () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test("should correctly instantiate Cliente with inheritance from Persona", () => {
    const cliente = new Cliente("C-123", "Juan Perez", "12345678", "juan@example.com");
    expect(cliente.id).toBe("C-123");
    expect(cliente.nombre).toBe("Juan Perez");
    expect(cliente.telefono).toBe("12345678");
    expect(cliente.email).toBe("juan@example.com");
  });

  test("should return the correct ID from obtenerIdentificacion()", () => {
    const cliente = new Cliente("C-123", "Juan Perez", "12345678", "juan@example.com");
    expect(cliente.obtenerIdentificacion()).toBe("C-123");
  });

  test("should associate a valid vehicle plaque and store it", () => {
    const cliente = new Cliente("C-123", "Juan Perez", "12345678", "juan@example.com");
    cliente.asociarVehiculo("XYZ-987");
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("[Cliente]: Vehículo con placa XYZ-987 asociado exitosamente al cliente C-123.")
    );
    expect(cliente.getPlacasVehiculos()).toEqual(["XYZ-987"]);
  });

  test("should ignore duplicate vehicle plaques", () => {
    const cliente = new Cliente("C-123", "Juan Perez", "12345678", "juan@example.com");
    cliente.asociarVehiculo("XYZ-987");
    logSpy.mockClear();
    cliente.asociarVehiculo("XYZ-987");
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("[Cliente]: El vehículo con placa XYZ-987 ya está asociado al cliente C-123.")
    );
    expect(cliente.getPlacasVehiculos()).toEqual(["XYZ-987"]);
  });

  test("should not associate an invalid or empty vehicle plaque", () => {
    const cliente = new Cliente("C-123", "Juan Perez", "12345678", "juan@example.com");
    cliente.asociarVehiculo("");
    expect(logSpy).toHaveBeenCalledWith("[Error]: La placa proporcionada no es válida.");

    logSpy.mockClear();
    cliente.asociarVehiculo("   ");
    expect(logSpy).toHaveBeenCalledWith("[Error]: La placa proporcionada no es válida.");
  });
});
