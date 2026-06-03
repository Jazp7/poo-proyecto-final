import { Cliente } from "../models/Cliente.js";
import { Mecanico } from "../models/Mecanico.js";
import { Vehiculo } from "../models/Vehiculo.js";
import { Repuesto } from "../models/Reparacion.js";
import { Reparacion } from "../models/Reparacion.js";
import { Factura } from "../models/Factura.js";

export class GestionTaller {
  private clientes: Cliente[] = [];
  private mecanicos: Mecanico[] = [];
  private vehiculos: Vehiculo[] = [];
  private repuestos: Repuesto[] = [];
  private repaciones: Reparacion[] = [];
  private facturas: Factura[] = [];

  constructor() {}

  //METODOS DE REGISTRO

  public registrarCliente(cliente: Cliente[]): void {
    //validamos si ya existe uyn cliente con la misma identificacion

    const clienteExistente = this.clientes.some(
      (c) => c.obtenerIdentificacion() === cliente.obtenerIdentificacion(),
    );

    if (clienteExistente) {
      throw new Error(
        `ERROR: El cliente con ID ${cliente.obtenerIdentificacion()} ya esta registrado en el sistema`,
      );
    }

    this.clientes.push(cliente);
    console.log(
      `Cliente: ${cliente.obtenerIdentificacion()} ha sido registrado con exito`,
    );
  }

  public registrarVehiculo(vehiculo: Vehiculo[]): void {
    //se agrega el vehiculo al arreglo principal
    this.vehiculos.push(vehiculo);
    console.log(`El Vehiculo ha sido regustrado correctamente`);
  }

  public registrarMecanico(mecanico: Mecanico[]): void {
    this.mecanicos.push(mecanico);
    console.log(`Mecanico: ${mecanico.obtenerIdentificacion()} dado de alta`);
  }

  public registrarRepuesto(repuesto: Repuesto[]): void {
    this.repuestos.push(repuesto);
    console.log(`Repuesto registrado en el inventario`);
  }

  //METODO DE ACCESO PARA OBTENER LA CANTIDAD DE CLIENTES

  public obtenerClientes(): Cliente[] {
    return this.clientes;
  }

  //LOGICA GENERAL DEL NEGOCIO

  public iniciarReparacion(
    placa: string,
    idMecanico: string,
    descripcion: string,
    manoDeObra: number,
  ): void {
    //validamos si el vehiculo ya esta registrado en el taller

    const vehiculoExiste = this.vehiculos.some((v) => v[`placa`] === placa);

    if (!vehiculoExiste) {
      throw new Error(
        `ERROR: No se puede iniciar la reparación. La  placa ${placa} no esta registrada en el sistema `,
      );
    }

    const mecanico = this.mecanicos.find(
      (m) => m.obtenerIdentificacion === idMecanico,
    );
    if (!mecanico) {
      throw new Error(
        `ERROR: El mecanico con ID ${idMecanico} no existe en la plantilla`,
      );
    }

    //se verifica si el mecanico esta disponible

    if (mecanico[`disponible`] === false) {
      throw new Error(
        `ERROR DE DISPONIBILIDAD: El mecanico ya esta asignado a otro vehiculo`,
      );
    }

    //generamos ID para la orden de reparacion
    const idReparacion = `REP-${this.repaciones.length + 1}`;

    const nuevaReparacion = new Reparacion(
      idReparacion,
      placa,
      idMecanico,
      descripcion,
      manoDeObra,
    );

    this.repaciones.push(nuevaReparacion);
    mecanico.cambiarDisponibilidad(false); //cambia su estado a ocupado

    console.log(
      `Orden: ${idReparacion} creada con exito para el vehiculo [${placa}]`,
    );
  }

  //Asocia una pieza del inventario a una orden de reparacion activa

  public asignarRepuestoAReparacion(
    idReparacion: string,
    idRepuesto: string,
    cant: number,
  ): void {
    //buscamis la orden de reparacion activa
    const reparacion = this.repaciones.find((r) => r[`id`] === idReparacion);
    if (!reparacion) {
      throw new Error(
        `ERROR DE INVENTARIO: La orden de reparacion ${idReparacion} no existe`,
      );
    }

    const repuesto = this.repuestos.find((r) => r[`id`] === idRepuesto);
    if (!repuesto) {
      throw new Error(
        `ERROR DE INVENTARIO: El repuesto no existe en el catagolo`,
      );
    }

    //verificar  si hay stock suficiente
    if (repuesto[`stock`] < cant) {
      throw new Error(
        `STOCK INSUFICIENTE: No se puede asignar. Stock actual de ${repuesto[`nombre`]}: ${repuesto[`stock`]} unidades`,
      );
    }

    repuesto.disminuirStock(cant);
    reparacion.agregarRepuesto(repuesto, cant);

    console.log(
      `Se agregaron ${cant} unidades de ${repuesto[`nombre`]} a la orden ${idReparacion}`,
    );
  }

  //FINALIZA EL SERVICIO Y CALCULA LOS COSTOS ACUMULADOS

  public finalizarYFacturarReparacion(idReparacion: string): Factura {
    //buscamos la orden de reparacion
    const reparacion = this.repaciones.find((r) => r[`id`] === idReparacion);
    if (!reparacion) {
      throw new Error(
        `No se puede facturar.La orden ${idReparacion} no existe`,
      );
    }

    //se modifica el estado de reparacion
    reparacion.actualizarEstado(`Completado`);

    const costoTotal = reparacion.calcularCostoTotal();

    const mecanico = this.mecanicos.find(
      (m) => m.obtenerIdentificacion() === reparacion[`idMecanico`],
    );
    if (mecanico) {
      mecanico.cambiarDisponibilidad(true);
    }

    //generamos un ID para la factura

    const idFactura = `FAC-${this.facturas.length + 1}`;

    const nuevaFactura = new Factura(idFactura, idReparacion, costoTotal);

    this.facturas.push(nuevaFactura);

    console.log(
      `Orden: ${idReparacion} cerrada. Factura ${idFactura} emitida correctamente`,
    );

    return nuevaFactura;
  }

  public consultarHistorialVehiculo(placa: string): Reparacion[] {
    // Filtramos en nuestro arreglo general todas las reparaciones que coincidan con la placa
    const historial = this.repaciones.filter(
      (r) => r["placaVehiculo"] === placa,
    );

    // Si no hay registros, imprimimos un aviso
    if (historial.length === 0) {
      console.log(
        `[Aviso]: No se encontraron registros de reparación previos para la placa [${placa}].`,
      );
    } else {
      console.log(
        `[Sistema]: Se encontraron ${historial.length} órdenes de servicio para la placa [${placa}].`,
      );
    }

    return historial;
  }
}
