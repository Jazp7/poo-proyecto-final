import { Cliente } from "../models/Cliente.js";
import { Mecanico } from "../models/Mecanico.js";
import { Vehiculo } from "../models/Vehiculo.js";
import { Repuesto } from "../models/Repuesto.js";
import { Reparacion } from "../models/Reparacion.js";
import { Factura } from "../models/Factura.js";

export class GestionTaller {
  private readonly _clientes: Cliente[] = [];
  private readonly _mecanicos: Mecanico[] = [];
  private readonly _vehiculos: Vehiculo[] = [];
  private readonly _repuestos: Repuesto[] = [];
  private readonly _reparaciones: Reparacion[] = [];
  private readonly _facturas: Factura[] = [];

  // ES6 GETTERS
  public get clientes(): Cliente[] {
    return this._clientes;
  }

  public get mecanicos(): Mecanico[] {
    return this._mecanicos;
  }

  public get vehiculos(): Vehiculo[] {
    return this._vehiculos;
  }

  public get repuestos(): Repuesto[] {
    return this._repuestos;
  }

  public get reparaciones(): Reparacion[] {
    return this._reparaciones;
  }

  public get facturas(): Factura[] {
    return this._facturas;
  }

  // METODOS DE REGISTRO
  public registrarCliente(cliente: Cliente): void {
    const clienteExistente = this._clientes.some(
      (c) => c.obtenerIdentificacion() === cliente.obtenerIdentificacion(),
    );

    if (clienteExistente) {
      throw new Error(
        `ERROR: El cliente con ID ${cliente.obtenerIdentificacion()} ya esta registrado en el sistema`,
      );
    }

    this._clientes.push(cliente);
    console.log(
      `Cliente: ${cliente.obtenerIdentificacion()} ha sido registrado con exito`,
    );
  }

  public registrarVehiculo(vehiculo: Vehiculo): void {
    const placa = vehiculo.obtenerPlaca();
    const clienteId = vehiculo.obtenerClienteId();

    const cliente = this._clientes.find(
      (c) => c.obtenerIdentificacion() === clienteId,
    );

    if (!cliente) {
      throw new Error(
        `ERROR: No se puede registrar el vehiculo. El cliente con ID ${clienteId} no existe`,
      );
    }

    const vehiculoExistente = this._vehiculos.some(
      (v) => v.obtenerPlaca() === placa,
    );

    if (vehiculoExistente) {
      throw new Error(
        `ERROR: El vehiculo con placa ${placa} ya esta registrado`,
      );
    }

    this._vehiculos.push(vehiculo);
    cliente.asociarVehiculo(placa);
    console.log(`El Vehiculo con placa ${placa} ha sido registrado correctamente`);
  }

  public registrarMecanico(mecanico: Mecanico): void {
    this._mecanicos.push(mecanico);
    console.log(`Mecanico: ${mecanico.obtenerIdentificacion()} dado de alta`);
  }

  public registrarRepuesto(repuesto: Repuesto): void {
    this._repuestos.push(repuesto);
    console.log(`Repuesto registrado en el inventario`);
  }

  // LOGICA GENERAL DEL NEGOCIO
  public iniciarReparacion(
    placa: string,
    idMecanico: string,
    descripcion: string,
    manoDeObra: number,
  ): void {
    const vehiculoExiste = this._vehiculos.some((v) => v.obtenerPlaca() === placa);

    if (!vehiculoExiste) {
      throw new Error(
        `ERROR: No se puede iniciar la reparación. La  placa ${placa} no esta registrada en el sistema `,
      );
    }

    const mecanico = this._mecanicos.find(
      (m) => m.obtenerIdentificacion() === idMecanico,
    );
    if (!mecanico) {
      throw new Error(
        `ERROR: El mecanico con ID ${idMecanico} no existe en la plantilla`,
      );
    }

    if (!mecanico.disponible) {
      throw new Error(
        `ERROR DE DISPONIBILIDAD: El mecanico ya esta asignado a otro vehiculo`,
      );
    }

    const idReparacion = `REP-${this._reparaciones.length + 1}`;

    const nuevaReparacion = new Reparacion(
      idReparacion,
      placa,
      idMecanico,
      descripcion,
      manoDeObra,
    );

    this._reparaciones.push(nuevaReparacion);
    mecanico.cambiarDisponibilidad(false);

    console.log(
      `Orden: ${idReparacion} creada con exito para el vehiculo [${placa}]`,
    );
  }

  public asignarRepuestoAReparacion(
    idReparacion: string,
    idRepuesto: string,
    cant: number,
  ): void {
    const reparacion = this._reparaciones.find((r) => r.id === idReparacion);
    if (!reparacion) {
      throw new Error(
        `ERROR DE INVENTARIO: La orden de reparacion ${idReparacion} no existe`,
      );
    }

    const repuesto = this._repuestos.find((r) => r.obtenerId() === idRepuesto);
    if (!repuesto) {
      throw new Error(
        `ERROR DE INVENTARIO: El repuesto no existe en el catagolo`,
      );
    }

    if (repuesto.obtenerStock() < cant) {
      const repuestoNombre = repuesto.obtenerNombre();
      const repuestoStock = repuesto.obtenerStock();
      throw new Error(
        `STOCK INSUFICIENTE: No se puede asignar. Stock actual de ${repuestoNombre}: ${repuestoStock} unidades`,
      );
    }

    repuesto.disminuirStock(cant);
    reparacion.agregarRepuesto(repuesto, cant);

    const repuestoNombre = repuesto.obtenerNombre();

    console.log(
      `Se agregaron ${cant} unidades de ${repuestoNombre} a la orden ${idReparacion}`,
    );
  }

  public finalizarYFacturarReparacion(idReparacion: string): Factura {
    const reparacion = this._reparaciones.find((r) => r.id === idReparacion);
    if (!reparacion) {
      throw new Error(
        `No se puede facturar.La orden ${idReparacion} no existe`,
      );
    }

    reparacion.actualizarEstado(`Completado`);

    const costoTotal = reparacion.calcularCostoTotal();

    const mecanico = this._mecanicos.find(
      (m) => m.obtenerIdentificacion() === reparacion.idMecanico,
    );
    if (mecanico) {
      mecanico.cambiarDisponibilidad(true);
    }

    const idFactura = `FAC-${this._facturas.length + 1}`;

    const nuevaFactura = new Factura(idFactura, idReparacion, costoTotal);

    this._facturas.push(nuevaFactura);

    console.log(
      `Orden: ${idReparacion} cerrada. Factura ${idFactura} emitida correctamente`,
    );

    return nuevaFactura;
  }

  public consultarHistorialVehiculo(placa: string): Reparacion[] {
    const historial = this._reparaciones.filter(
      (r) => r.placaVehiculo === placa,
    );

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

