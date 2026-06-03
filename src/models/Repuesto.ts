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

  public disminuirStock(cantidad: number): void {}

  public aumentarStock(cantidad: number): void {}
}