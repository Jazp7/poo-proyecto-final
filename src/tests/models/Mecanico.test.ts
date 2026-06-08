import { jest } from "@jest/globals";
import { Mecanico } from "../../models/Mecanico.js";

describe("Mecanico Model Tests", () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test("should correctly instantiate Mecanico with inheritance from Persona", () => {
    const mecanico = new Mecanico("M-001", "Carlos Gomez", "87654321", "carlos@example.com", "Motor");
    expect(mecanico.id).toBe("M-001");
    expect(mecanico.nombre).toBe("Carlos Gomez");
    expect(mecanico.telefono).toBe("87654321");
    expect(mecanico.email).toBe("carlos@example.com");
    expect(mecanico.disponible).toBe(true);
  });

  test("should return the correct ID from obtenerIdentificacion()", () => {
    const mecanico = new Mecanico("M-001", "Carlos Gomez", "87654321", "carlos@example.com", "Motor");
    expect(mecanico.obtenerIdentificacion()).toBe("M-001");
  });

  test("should change availability to occupied", () => {
    const mecanico = new Mecanico("M-001", "Carlos Gomez", "87654321", "carlos@example.com", "Motor");
    mecanico.cambiarDisponibilidad(false);
    expect(mecanico.disponible).toBe(false);
    expect(logSpy).toHaveBeenCalledWith("[Mecánico]: Estado de Carlos Gomez cambiado a Ocupado.");
  });

  test("should log warning when changing availability to the same state", () => {
    const mecanico = new Mecanico("M-001", "Carlos Gomez", "87654321", "carlos@example.com", "Motor");
    // Already disponible by default
    mecanico.cambiarDisponibilidad(true);
    expect(mecanico.disponible).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("[Mecánico]: El mecánico Carlos Gomez ya se encuentra Disponible.");
  });
});
