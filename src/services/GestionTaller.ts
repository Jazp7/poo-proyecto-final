import { Cliente } from "../models/Cliente.js";
import { Mecanico } from "../models/Mecanico.js";
import { Vehiculo } from "../models/Vehiculo.js";
import { Repuesto } from "../models/Repuesto.js";
import { Reparacion } from "../models/Reparacion.js";
import { Factura } from "../models/Factura.js";
import { Validador } from "../utils/Validador.js";

export class GestionTaller {
  private readonly _clientes: Cliente[] = [];
  private readonly _mecanicos: Mecanico[] = [];
  private readonly _vehiculos: Vehiculo[] = [];
  private readonly _repuestos: Repuesto[] = [];
  private readonly _reparaciones: Reparacion[] = [];
  private readonly _facturas: Factura[] = [];

  // No se necesita constructor, así que se elimina para evitar redondancias
  // constructor() {}

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
  public registrarCliente(cliente: Cliente): Cliente {
    Validador.validarId(cliente.id);
    Validador.validarTextoObligatorio(cliente.nombre, "Nombre");
    Validador.validarTelefono(cliente.telefono);
    Validador.validarEmail(cliente.email);

    const clienteExistente = this._clientes.some(
      (c) => c.obtenerIdentificacion() === cliente.obtenerIdentificacion(),
    );

    // Validacion
    if (clienteExistente) {
      throw new Error(
        `El cliente con ID ${cliente.obtenerIdentificacion()} ya esta registrado en el sistema`,
      );
    }

    this._clientes.push(cliente);
    return cliente;
  }

  public registrarVehiculo(vehiculo: Vehiculo): Vehiculo {
    Validador.validarPlaca((vehiculo as any)['placa']);
    Validador.validarTextoObligatorio((vehiculo as any)['marca'], "Marca");
    Validador.validarTextoObligatorio((vehiculo as any)['modelo'], "Modelo");
    Validador.validarAnio((vehiculo as any)['anio']);
    Validador.validarId((vehiculo as any)['clienteId']);
    if (vehiculo.obtenerTipo() === "Sedan") {
      Validador.validarStock((vehiculo as any)['nroPuertas']);
    } else if (vehiculo.obtenerTipo() === "Moto") {
      Validador.validarStock((vehiculo as any)['cilindrada']);
    }

    const vehiculoExistente = this._vehiculos.some(
      (v) => (v as any)['placa'] === (vehiculo as any)['placa'],
    );
    if (vehiculoExistente) {
      throw new Error(`El vehiculo con placa ${(vehiculo as any)['placa']} ya esta registrado en el sistema`);
    }

    const clienteExiste = this._clientes.some(
      (c) => c.obtenerIdentificacion() === (vehiculo as any)['clienteId'],
    );
    if (!clienteExiste) {
      throw new Error(`No se puede registrar el vehiculo. El cliente con ID ${(vehiculo as any)['clienteId']} no existe en el sistema`);
    }

    this._vehiculos.push(vehiculo);
    return vehiculo;
  }

  public registrarMecanico(mecanico: Mecanico): Mecanico {
    Validador.validarId(mecanico.id);
    Validador.validarTextoObligatorio(mecanico.nombre, "Nombre");
    Validador.validarTelefono(mecanico.telefono);
    Validador.validarEmail(mecanico.email);
    Validador.validarTextoObligatorio(mecanico['especialidad'], "Especialidad");

    const mecanicoExistente = this._mecanicos.some(
      (m) => m.obtenerIdentificacion() === mecanico.obtenerIdentificacion(),
    );
    if (mecanicoExistente) {
      throw new Error(`El mecanico con ID ${mecanico.obtenerIdentificacion()} ya esta registrado en la plantilla`);
    }

    this._mecanicos.push(mecanico);
    return mecanico;
  }

  public registrarRepuesto(repuesto: Repuesto): Repuesto {
    Validador.validarId(repuesto.id);
    Validador.validarTextoObligatorio(repuesto.nombre, "Nombre");
    Validador.validarPrecio(repuesto.precio);
    Validador.validarStock(repuesto.stock);

    const repuestoExistente = this._repuestos.some(
      (r) => r.id === repuesto.id,
    );
    if (repuestoExistente) {
      throw new Error(`El repuesto con ID ${repuesto.id} ya esta registrado en el inventario`);
    }

    this._repuestos.push(repuesto);
    return repuesto;
  }

  // LOGICA GENERAL DEL NEGOCIO
  public iniciarReparacion(
    placa: string,
    idMecanico: string,
    descripcion: string,
    manoDeObra: number,
  ): Reparacion {
    Validador.validarPlaca(placa);
    Validador.validarId(idMecanico);
    Validador.validarTextoObligatorio(descripcion, "Descripción del problema");
    Validador.validarManoDeObra(manoDeObra);

    const vehiculoExiste = this._vehiculos.some((v) => v[`placa`] === placa);

    if (!vehiculoExiste) {
      throw new Error(
        `No se puede iniciar la reparación. La placa ${placa} no esta registrada en el sistema.`,
      );
    }

    const mecanico = this._mecanicos.find(
      (m) => m.obtenerIdentificacion() === idMecanico,
    );
    if (!mecanico) {
      throw new Error(
        `El mecanico con ID ${idMecanico} no existe en la plantilla.`
      );
    }

    if (mecanico[`disponible`] === false) {
      throw new Error(
        `El mecanico ya esta asignado a otro vehiculo`
      );
    }

    const reparacionActiva = this._reparaciones.some(
      (r) => r.placaVehiculo === placa && r.estado === "En Proceso",
    );
    if (reparacionActiva) {
      throw new Error(`El vehiculo con placa ${placa} ya tiene una orden de reparacion activa en proceso`);
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

    return nuevaReparacion;
  }

  public asignarRepuestoAReparacion(
    idReparacion: string,
    idRepuesto: string,
    cant: number,
  ): { reparacion: Reparacion; repuesto: Repuesto; cantidad: number } {
    Validador.validarTextoObligatorio(idReparacion, "ID de la reparación");
    Validador.validarId(idRepuesto);
    Validador.validarStock(cant);

    const reparacion = this._reparaciones.find((r) => r[`id`] === idReparacion);
    if (!reparacion) {
      throw new Error(
        `ERROR DE INVENTARIO: La orden de reparacion ${idReparacion} no existe`,
      );
    }

    if (reparacion.estado === "Completado") {
      throw new Error(`No se pueden asignar repuestos. La orden de reparacion ${idReparacion} ya esta completada`);
    }

    const repuesto = this._repuestos.find((r) => r[`id`] === idRepuesto);
    if (!repuesto) {
      throw new Error(
        `ERROR DE INVENTARIO: El repuesto no existe en el catagolo`,
      );
    }

    if (repuesto[`stock`] < cant) {
      // variables para evitar doble backticks
      let respuestoNombre = repuesto[`nombre`];
      let repuestoStock = repuesto[`stock`];
      throw new Error(
        `STOCK INSUFICIENTE: No se puede asignar. Stock actual de ${respuestoNombre}: ${repuestoStock} unidades`,
      );
    }

    repuesto.disminuirStock(cant);
    reparacion.agregarRepuesto(repuesto, cant);

    return { reparacion, repuesto, cantidad: cant };
  }

  public finalizarYFacturarReparacion(idReparacion: string): Factura {
    Validador.validarTextoObligatorio(idReparacion, "ID de la reparación");

    const reparacion = this._reparaciones.find((r) => r[`id`] === idReparacion);
    if (!reparacion) {
      throw new Error(
        `No se puede facturar.La orden ${idReparacion} no existe`,
      );
    }

    if (reparacion.estado === "Completado") {
      throw new Error(`No se puede facturar. La orden de reparacion ${idReparacion} ya ha sido finalizada y facturada previamente`);
    }

    reparacion.actualizarEstado(`Completado`);

    const costoTotal = reparacion.calcularCostoTotal();

    const mecanico = this._mecanicos.find(
      (m) => m.obtenerIdentificacion() === reparacion[`idMecanico`],
    );
    if (mecanico) {
      mecanico.cambiarDisponibilidad(true);
    }

    const idFactura = `FAC-${this._facturas.length + 1}`;

    const nuevaFactura = new Factura(idFactura, idReparacion, costoTotal);

    this._facturas.push(nuevaFactura);

    return nuevaFactura;
  }

  public consultarHistorialVehiculo(placa: string): Reparacion[] {
    Validador.validarPlaca(placa);

    const vehiculoExiste = this._vehiculos.some((v) => (v as any)['placa'] === placa);
    if (!vehiculoExiste) {
      throw new Error(`La placa ${placa} no esta registrada en el sistema`);
    }

    const historial = this._reparaciones.filter(
      (r) => r["placaVehiculo"] === placa,
    );

    return historial;
  }
}
