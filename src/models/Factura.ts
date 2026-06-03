export class Factura {
    private idFactura: string;
    private idReparacion: string;
    private totalPagado: number;
    private fechaEmision: Date;

    constructor(idFactura: string, idReparacion: string, totalPagado: number) {
        this.idFactura = idFactura;
        this.idReparacion = idReparacion;
        this.totalPagado = totalPagado;
        this.fechaEmision = new Date();
    }

    public getIdFactura(): string { return this.idFactura; }
    public getIdReparacion(): string { return this.idReparacion; }
    public getTotalPagado(): number { return this.totalPagado; }
    public getFechaEmision(): Date { return this.fechaEmision; }

    
     // Genera un recibo  formateado 
     
    public generarDetalleFactura(): string {
        const IVA = 0.13;
        const subtotal = this.totalPagado / (1 + IVA);
        const impuesto = this.totalPagado - subtotal;

        return `
==================================================               
               COMPROBANTE DE PAGO                
==================================================
 ID Factura    : ${this.idFactura}
 ID Reparación : ${this.idReparacion}
 Fecha Emisión : ${this.fechaEmision.toLocaleString()}
 --------------------------------------------------
 DETALLE DE COBROS:
 Subtotal      : $${subtotal.toFixed(2)}
 IVA (13%)     : $${impuesto.toFixed(2)}
 --------------------------------------------------
 TOTAL PAGADO  : $${this.totalPagado.toFixed(2)}
 ==================================================
                 ¡Gracias por su confianza!
 ==================================================
`;
    }
}
