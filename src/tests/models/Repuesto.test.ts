import { Repuesto } from "../../models/Repuesto.js";

describe("Repuesto Model Tests", () => {
  test("should correctly instantiate Repuesto and get attributes", () => {
    const repuesto = new Repuesto("R-100", "Filtro de Aceite", 15.5, 20);
    expect(repuesto.obtenerId()).toBe("R-100");
    expect(repuesto.obtenerNombre()).toBe("Filtro de Aceite");
    expect(repuesto.obtenerPrecio()).toBe(15.5);
    expect(repuesto.obtenerStock()).toBe(20);
  });

  test("should increase stock correctly", () => {
    const repuesto = new Repuesto("R-100", "Filtro de Aceite", 15.5, 20);
    repuesto.aumentarStock(10);
    expect(repuesto.obtenerStock()).toBe(30);
  });

  test("should throw error when increasing stock with invalid amount", () => {
    const repuesto = new Repuesto("R-100", "Filtro de Aceite", 15.5, 20);
    expect(() => repuesto.aumentarStock(0)).toThrow("[Inventario]: La cantidad a añadir debe ser mayor a cero.");
    expect(() => repuesto.aumentarStock(-5)).toThrow("[Inventario]: La cantidad a añadir debe ser mayor a cero.");
  });

  test("should decrease stock correctly", () => {
    const repuesto = new Repuesto("R-100", "Filtro de Aceite", 15.5, 20);
    repuesto.disminuirStock(5);
    expect(repuesto.obtenerStock()).toBe(15);
  });

  test("should throw error when decreasing stock with invalid amount", () => {
    const repuesto = new Repuesto("R-100", "Filtro de Aceite", 15.5, 20);
    expect(() => repuesto.disminuirStock(0)).toThrow("[Inventario]: La cantidad a disminuir debe ser mayor a cero.");
    expect(() => repuesto.disminuirStock(-5)).toThrow("[Inventario]: La cantidad a disminuir debe ser mayor a cero.");
  });

  test("should throw error when decreasing stock beyond available stock", () => {
    const repuesto = new Repuesto("R-100", "Filtro de Aceite", 15.5, 20);
    expect(() => repuesto.disminuirStock(25)).toThrow(
      "[Inventario]: Stock insuficiente para Filtro de Aceite. Disponibles: 20, Solicitados: 25"
    );
  });
});
