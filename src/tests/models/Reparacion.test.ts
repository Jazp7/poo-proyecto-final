import { jest } from "@jest/globals";
import { Reparacion } from "../../models/Reparacion.js";
import { Repuesto } from "../../models/Repuesto.js";

describe("Reparacion Model Tests", () => {
  let logSpy: any;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test("should correctly instantiate Reparacion", () => {
    const reparacion = new Reparacion("REP-1", "ABC-123", "M-001", "Cambio de aceite", 50.0);
    expect(reparacion.id).toBe("REP-1");
    expect(reparacion.placaVehiculo).toBe("ABC-123");
    expect(reparacion.idMecanico).toBe("M-001");
    expect(reparacion.descripcionProblema).toBe("Cambio de aceite");
    expect(reparacion.costoManoObra).toBe(50.0);
    expect(reparacion.estado).toBe("En Proceso");
  });

  test("should log message when adding repuesto", () => {
    const reparacion = new Reparacion("REP-1", "ABC-123", "M-001", "Cambio de aceite", 50.0);
    const repuesto = new Repuesto("R-100", "Filtro de Aceite", 15.5, 20);
    reparacion.agregarRepuesto(repuesto, 2);
    expect(logSpy).toHaveBeenCalledWith("[Reparación]: Agregados 2 unidades de repuesto a la orden REP-1.");
  });

  test("should update state correctly", () => {
    const reparacion = new Reparacion("REP-1", "ABC-123", "M-001", "Cambio de aceite", 50.0);
    reparacion.actualizarEstado("Completado");
    expect(reparacion.estado).toBe("Completado");
  });

  test("should calculate cost total including labor and assigned spare parts", () => {
    const reparacion = new Reparacion("REP-1", "ABC-123", "M-001", "Cambio de aceite", 50.0);
    const repuesto1 = new Repuesto("R-100", "Filtro de Aceite", 15.0, 20);
    const repuesto2 = new Repuesto("R-200", "Aceite Sintético", 25.0, 10);

    reparacion.agregarRepuesto(repuesto1, 1);
    reparacion.agregarRepuesto(repuesto2, 2);

    // Total should be: labor (50) + repuesto1 (15 * 1) + repuesto2 (25 * 2) = 50 + 15 + 50 = 115.0
    expect(reparacion.calcularCostoTotal()).toBe(115.0);
    expect(reparacion.getRepuestosAsignados()).toEqual([
      { repuesto: repuesto1, cantidad: 1 },
      { repuesto: repuesto2, cantidad: 2 }
    ]);
  });
});
