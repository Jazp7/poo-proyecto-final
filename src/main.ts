import { GestionTaller } from "./services/GestionTaller.js";
import { Menu } from "./cli/Menu.js";
// Descomenta la siguiente línea para habilitar datos de prueba
// import { Semillero } from "./utils/Semillero.js";

const taller = new GestionTaller();

// Descomenta la siguiente línea si deseas iniciar con datos cargados
// Semillero.cargarDatosDePrueba(taller);

const menu = new Menu(taller);
menu.iniciar();

