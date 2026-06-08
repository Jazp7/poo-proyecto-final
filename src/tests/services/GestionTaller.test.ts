import { jest } from "@jest/globals";
import { GestionTaller } from "../../services/GestionTaller.js";
import { Cliente } from "../../models/Cliente.js";
import { Mecanico } from "../../models/Mecanico.js";
import { Sedan } from "../../models/Sedan.js";
import { Repuesto } from "../../models/Repuesto.js";

describe("GestionTaller Service Tests", () => {
  let taller: GestionTaller;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    taller = new GestionTaller();
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  describe("Registrations", () => {
    test("should register client successfully", () => {
      const cliente = new Cliente("C-1", "Ana", "1111", "ana@example.com");
      taller.registrarCliente(cliente);
      expect(taller.clientes.length).toBe(1);
      expect(taller.clientes[0]).toBe(cliente);
    });

    test("should throw error when registering client with duplicate ID", () => {
      const cliente1 = new Cliente("C-1", "Ana", "1111", "ana@example.com");
      const cliente2 = new Cliente("C-1", "Ana Copia", "2222", "ana2@example.com");
      taller.registrarCliente(cliente1);
      expect(() => taller.registrarCliente(cliente2)).toThrow(
        "ERROR: El cliente con ID C-1 ya esta registrado en el sistema"
      );
    });

    test("should register vehicle successfully", () => {
      const sedan = new Sedan("ABC-123", "Toyota", "Corolla", 2020, "C-1", 4);
      taller.registrarVehiculo(sedan);
      expect(taller.vehiculos.length).toBe(1);
      expect(taller.vehiculos[0]).toBe(sedan);
    });

    test("should register mechanic successfully", () => {
      const mecanico = new Mecanico("M-1", "Bob", "3333", "bob@example.com", "Suspension");
      taller.registrarMecanico(mecanico);
      expect(taller.mecanicos.length).toBe(1);
      expect(taller.mecanicos[0]).toBe(mecanico);
    });

    test("should register repuesto successfully", () => {
      const repuesto = new Repuesto("R-1", "Bujía", 5.0, 50);
      taller.registrarRepuesto(repuesto);
      expect(taller.repuestos.length).toBe(1);
      expect(taller.repuestos[0]).toBe(repuesto);
    });
  });

  describe("Repair Flow", () => {
    let cliente: Cliente;
    let sedan: Sedan;
    let mecanico: Mecanico;
    let repuesto: Repuesto;

    beforeEach(() => {
      cliente = new Cliente("C-1", "Ana", "1111", "ana@example.com");
      sedan = new Sedan("ABC-123", "Toyota", "Corolla", 2020, "C-1", 4);
      mecanico = new Mecanico("M-1", "Bob", "3333", "bob@example.com", "Suspension");
      repuesto = new Repuesto("R-1", "Bujía", 5.0, 50);

      taller.registrarCliente(cliente);
      taller.registrarVehiculo(sedan);
      taller.registrarMecanico(mecanico);
      taller.registrarRepuesto(repuesto);
    });

    test("should successfully start a repair and set mechanic availability to false", () => {
      taller.iniciarReparacion("ABC-123", "M-1", "Falla de encendido", 45.0);
      
      expect(taller.reparaciones.length).toBe(1);
      const rep = taller.reparaciones[0]!;
      expect(rep.id).toBe("REP-1");
      expect(rep.placaVehiculo).toBe("ABC-123");
      expect(rep.idMecanico).toBe("M-1");
      expect(rep.costoManoObra).toBe(45.0);
      expect(rep.estado).toBe("En Proceso");
      
      // Mechanic should be unavailable now
      expect(mecanico.disponible).toBe(false);
    });

    test("should throw error if starting repair for unregistered vehicle", () => {
      expect(() => {
        taller.iniciarReparacion("XYZ-999", "M-1", "Falla", 45.0);
      }).toThrow("ERROR: No se puede iniciar la reparación. La  placa XYZ-999 no esta registrada en el sistema");
    });

    test("should throw error if starting repair with unregistered mechanic", () => {
      expect(() => {
        taller.iniciarReparacion("ABC-123", "M-99", "Falla", 45.0);
      }).toThrow("ERROR: El mecanico con ID M-99 no existe en la plantilla");
    });

    test("should throw error if starting repair with an unavailable mechanic", () => {
      // Start a first repair to make mechanic busy
      taller.iniciarReparacion("ABC-123", "M-1", "Falla 1", 45.0);
      
      // Register a second vehicle
      const sedan2 = new Sedan("XYZ-999", "Honda", "Civic", 2021, "C-1", 4);
      taller.registrarVehiculo(sedan2);

      // Try starting another repair with same busy mechanic
      expect(() => {
        taller.iniciarReparacion("XYZ-999", "M-1", "Falla 2", 30.0);
      }).toThrow("ERROR DE DISPONIBILIDAD: El mecanico ya esta asignado a otro vehiculo");
    });

    test("should assign repuesto to repair and decrease stock", () => {
      taller.iniciarReparacion("ABC-123", "M-1", "Falla", 40.0);
      taller.asignarRepuestoAReparacion("REP-1", "R-1", 4);

      expect(repuesto.obtenerStock()).toBe(46); // 50 - 4 = 46
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining("Se agregaron 4 unidades de Bujía a la orden REP-1")
      );
    });

    test("should throw error when assigning repuesto to non-existent repair", () => {
      expect(() => {
        taller.asignarRepuestoAReparacion("REP-99", "R-1", 2);
      }).toThrow("ERROR DE INVENTARIO: La orden de reparacion REP-99 no existe");
    });

    test("should throw error when assigning non-existent repuesto to repair", () => {
      taller.iniciarReparacion("ABC-123", "M-1", "Falla", 40.0);
      expect(() => {
        taller.asignarRepuestoAReparacion("REP-1", "R-99", 2);
      }).toThrow("ERROR DE INVENTARIO: El repuesto no existe en el catagolo");
    });

    test("should throw error when assigning repuesto with insufficient stock", () => {
      taller.iniciarReparacion("ABC-123", "M-1", "Falla", 40.0);
      expect(() => {
        taller.asignarRepuestoAReparacion("REP-1", "R-1", 100);
      }).toThrow("STOCK INSUFICIENTE: No se puede asignar. Stock actual de Bujía: 50 unidades");
    });

    test("should finalize repair, emit invoice, and set mechanic availability to true", () => {
      taller.iniciarReparacion("ABC-123", "M-1", "Falla", 80.0);
      
      const factura = taller.finalizarYFacturarReparacion("REP-1");
      
      expect(taller.reparaciones[0]!.estado).toBe("Completado");
      expect(mecanico.disponible).toBe(true);
      expect(factura.getIdReparacion()).toBe("REP-1");
      expect(factura.getTotalPagado()).toBe(80.0);
      expect(taller.facturas.length).toBe(1);
      expect(taller.facturas[0]).toBe(factura);
    });

    test("should throw error when finalising non-existent repair", () => {
      expect(() => {
        taller.finalizarYFacturarReparacion("REP-99");
      }).toThrow("No se puede facturar.La orden REP-99 no existe");
    });

    test("should consult vehicle repair history correctly", () => {
      taller.iniciarReparacion("ABC-123", "M-1", "Falla 1", 50.0);
      
      // Free mechanic and start another repair
      mecanico.cambiarDisponibilidad(true);
      taller.iniciarReparacion("ABC-123", "M-1", "Falla 2", 100.0);

      const history = taller.consultarHistorialVehiculo("ABC-123");
      expect(history.length).toBe(2);
      expect(history[0]!.id).toBe("REP-1");
      expect(history[1]!.id).toBe("REP-2");
      expect(logSpy).toHaveBeenCalledWith("[Sistema]: Se encontraron 2 órdenes de servicio para la placa [ABC-123].");
    });

    test("should handle consulting history for vehicle with no repairs", () => {
      const history = taller.consultarHistorialVehiculo("XYZ-999");
      expect(history.length).toBe(0);
      expect(logSpy).toHaveBeenCalledWith("[Aviso]: No se encontraron registros de reparación previos para la placa [XYZ-999].");
    });
  });
});
