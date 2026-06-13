import { Factura } from "../../models/Factura.js";

describe("Factura Model Tests", () => {
  test("should correctly instantiate Factura and get attributes", () => {
    const factura = new Factura("FAC-1", "REP-1", 113.0);
    expect(factura.getIdFactura()).toBe("FAC-1");
    expect(factura.getIdReparacion()).toBe("REP-1");
    expect(factura.getTotalPagado()).toBe(113.0);
    expect(factura.getFechaEmision()).toBeInstanceOf(Date);
  });

  test("should generate correct billing details with 13% IVA", () => {
    const factura = new Factura("FAC-1", "REP-1", 113.0);
    const detalle = factura.generarDetalleFactura();
    
    // Total is $113.0.
    // Since IVA is 13%, total = subtotal * 1.13 -> subtotal = 113 / 1.13 = 100.00
    // IVA = 113 - 100 = 13.00
    expect(detalle).toContain("ID Factura    : FAC-1");
    expect(detalle).toContain("ID Reparación : REP-1");
    expect(detalle).toContain("Subtotal      : $100.00");
    expect(detalle).toContain("IVA (13%)     : $13.00");
    expect(detalle).toContain("TOTAL PAGADO  : $113.00");
  });
});
