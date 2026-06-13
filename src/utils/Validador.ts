

export class Validador {
    /**
     * Valida un email y devuelveun mensaje de error si falla.
     */
    public static validarEmail(email: string): void {
        // 1. Validar que no esté vacío y tenga una longitud mínima
        if (!email || email.length < 5) {
            throw new Error("El email no puede estar vacío y debe tener al menos 5 caracteres.");
        }

        // 2. Validar que tenga exactamente un '@'
        const partes = email.split('@');
        if (partes.length !== 2) {
            throw new Error("El email debe contener exactamente un símbolo '@'.");
        }

        const [parteLocal, dominio] = partes as [string, string];

        // 3. Validar que haya algo antes del '@'
        if (parteLocal.length === 0) {
            throw new Error("Falta el nombre de usuario antes de la '@'.");
        }

        // 3.1. Validar que haya algo después del '@'
        if (!dominio) {
            throw new Error("Falta el dominio después de la '@'.");
        }

        // 4. Validar tu regla específica: NO números después de la '@'
        // \d busca cualquier dígito (0-9). Si lo encuentra en el dominio, falla.
        if (/\d/.test(dominio)) {
            throw new Error("El dominio (después de la '@') no puede contener números.");
        }

        // 5. Validar formato básico del dominio (ej: letras.punto.letras)
        // Esta regex asegura que el dominio sean solo letras, un punto, y más letras (ej: gmail.com)
        const dominioRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/;
        if (!dominioRegex.test(dominio)) {
            throw new Error("El formato del dominio no es válido (ejemplo correcto: dominio.com).");
        }

        // 6. Validar que la parte local no tenga caracteres extraños (opcional pero recomendado)
        const parteLocalRegex = /^[a-zA-Z0-9._-]+$/;
        if (!parteLocalRegex.test(parteLocal)) {
            throw new Error("El nombre de usuario contiene caracteres no permitidos.");
        }

        // Si pasa todas las pruebas, es válido
    }

    /**
     * Valida un número de teléfono y devuelve un mensaje de error si falla.
     */
    public static validarTelefono(telefono: string): void {
        // 1. Limpieza: Eliminamos espacios y guiones por si el usuario los escribe (ej: "1234-5678" o "1234 5678")
        const telefonoLimpio = telefono.replace(/[\s-]/g, '');

        // 2. Validar que no esté vacío después de limpiar
        if (!telefonoLimpio) {
            throw new Error("Error: el número de teléfono no puede estar vacío.");
        }

        // 3. Validar que SOLO contenga dígitos (números del 0 al 9)
        // \d+ significa "uno o más dígitos". ^ y $ aseguran que sea toda la cadena.
        if (!/^\d+$/.test(telefonoLimpio)) {
            throw new Error("El teléfono solo puede contener números")        }

        // 4. No debe tener más de 8 dígitos
        if (telefonoLimpio.length > 8) {
            throw new Error("El número de teléfono no puede tener más de 8 dígitos." );
        }

        // 5. Validar que sean mínimo 8 digitos 
        // Si no pones esto, "12" sería considerado un teléfono válido.
        if (telefonoLimpio.length !== 8) {
            throw new Error("El número de teléfono debe tener exactamente 8 dígitos." );
        }

        // Si pasa todas las pruebas, es válido
    }

    /**
     * Valida un ID según las 3 reglas requeridas.
     */
    public static validarId(id: string): void {
        // 1. Validar que no esté vacío
        if (!id || id.trim().length === 0) {
            throw new Error("El ID no puede estar vacío.");
        }
        // 2. Validar que contenga al menos un número
        if (!/\d/.test(id)) {
            throw new Error("El ID debe contener al menos un número.");
        }
        // 3. Validar que NO contenga letras
        if (/[a-zA-Z]/.test(id)) {
            throw new Error("El ID no puede contener letras.");
        }
    }

    /**
     * Valida que el stock sea un número entero no negativo.
     */
    public static validarStock(stock: number): void {
        if (!Number.isInteger(stock) || stock < 0) {
            throw new Error("El stock debe ser un número entero no negativo (mayor o igual a 0).");
        }
    }

    /**
     * Valida que un monto de dinero (precio) sea mayor a cero.
     */
    public static validarPrecio(precio: number): void {
        if (Number.isNaN(precio) || precio <= 0) {
            throw new Error("El precio debe ser un número mayor a cero.");
        }
    }

    /**
     * Valida que el costo de la mano de obra sea mayor o igual a cero.
     */
    public static validarManoDeObra(costo: number): void {
        if (Number.isNaN(costo) || costo < 0) {
            throw new Error("El costo de mano de obra no puede ser negativo.");
        }
    }

    /**
     * Valida que la placa no esté vacía y cumpla un formato básico.
     */
    public static validarPlaca(placa: string): void {
        if (!placa || placa.trim().length === 0) {
            throw new Error("La placa del vehículo no puede estar vacía. Ejemplo: ABC-1234 o 1234ABC.");
        }
        // Excluye espacios y caracteres extraños
        if (!/^[a-zA-Z0-9-]+$/.test(placa)) {
            throw new Error("La placa solo puede contener letras, números y guiones (sin espacios). Ejemplo de formatos válidos: ABC-1234, P123456 o 1782-XYZ.");
        }
    }

    /**
     * Valida que el año del vehículo sea coherente.
     */
    public static validarAnio(anio: number): void {
        const anioActual = new Date().getFullYear();
        if (!Number.isInteger(anio) || anio < 1900 || anio > anioActual + 1) {
            throw new Error(`El año debe estar entre 1900 y ${anioActual + 1}.`);
        }
    }

    /**
     * Valida que un campo de texto obligatorio no esté vacío.
     */
    public static validarTextoObligatorio(texto: string, nombreCampo: string): void {
        if (!texto || texto.trim().length === 0) {
            throw new Error(`El campo '${nombreCampo}' es obligatorio y no puede estar vacío.`);
        }
    }
}
