import { GestionTaller } from "./services/GestionTaller.js";
import { Menu } from "./cli/Menu.js";

const taller = new GestionTaller();
const menu = new Menu(taller);
menu.iniciar();
