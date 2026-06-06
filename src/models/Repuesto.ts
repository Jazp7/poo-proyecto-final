export class Repuesto {
  public id: string;
  public nombre: string;
  public precio: number;
  public stock: number;

  constructor(id: string, nombre: string, precio: number, stock: number) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }


public obtenerId(): string {
        return this.id;
    }

    public obtenerNombre(): string {
        return this.nombre;
    }

    public obtenerPrecio(): number {
        return this.precio;
    }

    public obtenerStock(): number {
        return this.stock;
    }

    public disminuirStock(cantidad: number): void {
        if (cantidad <= 0) {
            throw new Error("[Inventario]: La cantidad a disminuir debe ser mayor a cero.");
        }
        if (this.stock < cantidad) {
            throw new Error(`[Inventario]: Stock insuficiente para ${this.nombre}. Disponibles: ${this.stock}, Solicitados: ${cantidad}`);
        }
        this.stock -= cantidad;
    }

    
    public aumentarStock(cantidad: number): void {
        if (cantidad <= 0) {
            throw new Error("[Inventario]: La cantidad a añadir debe ser mayor a cero.");
        }
        this.stock += cantidad;
    }

}