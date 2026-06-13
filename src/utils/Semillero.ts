import { GestionTaller } from "../services/GestionTaller.js";
import { Cliente } from "../models/Cliente.js";
import { Sedan } from "../models/Sedan.js";
import { Moto } from "../models/Moto.js";
import { Mecanico } from "../models/Mecanico.js";
import { Repuesto } from "../models/Repuesto.js";

export class Semillero {
  /**
   * Carga datos iniciales de prueba en la instancia del taller.
   * Útil para demostraciones o pruebas rápidas.
   */
  public static cargarDatosDePrueba(taller: GestionTaller): void {
    // 1. Clientes (IDs numéricos válidos)
    const cliente1 = new Cliente("1001", "Juan Pérez", "88888888", "juan.perez@email.com");
    const cliente2 = new Cliente("1002", "María López", "77777777", "maria.lopez@email.com");
    taller.registrarCliente(cliente1);
    taller.registrarCliente(cliente2);

    // 2. Vehículos
    const sedan = new Sedan("ABC-1234", "Toyota", "Corolla", 2020, "1001", 4);
    const moto = new Moto("1782-XYZ", "Honda", "CB500", 2022, "1002", 500);
    taller.registrarVehiculo(sedan);
    taller.registrarVehiculo(moto);

    // 3. Mecánicos (IDs numéricos válidos)
    const mecanico1 = new Mecanico("2001", "Carlos Gómez", "66666666", "carlos.gomez@email.com", "Mecánica General");
    const mecanico2 = new Mecanico("2002", "Ana Ramírez", "55555555", "ana.ramirez@email.com", "Electrónica");
    taller.registrarMecanico(mecanico1);
    taller.registrarMecanico(mecanico2);

    // 4. Repuestos
    const repuesto1 = new Repuesto("3001", "Filtro de Aceite", 15.50, 20);
    const repuesto2 = new Repuesto("3002", "Pastillas de Freno", 45.00, 10);
    const repuesto3 = new Repuesto("3003", "Batería 12V", 85.00, 5);
    taller.registrarRepuesto(repuesto1);
    taller.registrarRepuesto(repuesto2);
    taller.registrarRepuesto(repuesto3);

    // 5. Iniciar y completar una reparación (Historial completado)
    // El mecánico 1 inicia reparación para el Sedán
    taller.iniciarReparacion("ABC-1234", "2001", "Cambio de aceite y revisión general", 35.00);
    taller.asignarRepuestoAReparacion("REP-1", "3001", 1); // Filtro
    taller.finalizarYFacturarReparacion("REP-1"); // Completada y Facturada (mecanico1 vuelve a estar disponible)

    // 6. Iniciar una reparación activa (En progreso)
    // El mecánico 2 inicia otra reparación para la Moto (queda activa)
    taller.iniciarReparacion("1782-XYZ", "2002", "Fallo de encendido en tablero", 50.00);
    taller.asignarRepuestoAReparacion("REP-2", "3003", 1); // Batería
  }
}
