/**
 * 
 * 1. ¿Por qué se utiliza el código de estado HTTP 422 Unprocessable Content 
 * para el título/prioridad en lugar de un código 400 Bad Request?
 * 
 * Porque los datos se pueden parsear y procesar bien cuando llegan al servidor, pero no son correctos para
 * para la logica de negocio ya que pueden presentar errores al realizar chequeos, etc.
 * 
 * En cambio un codigo 400 Bad Request representa una peticion malformada a nivel de sintaxis o protocolo
 * donde el servidor ni siquiera puede interpretar o parsear el cuerpo de la solicitud (por ejemplo, 
 * un JSON mal escrito o la ausencia total del cuerpo cuando se requiere).
 * 
 * 2. ¿Qué ocurriría si se envía un JSON como {"titulo": " AB ", "prioridad": "alta"}? 
 * ¿Pasa o falla la validación? Justifica evaluando el código.
 * 
 * Fallaria la segunda verificacion al comprobar el titulo, ya que no tiene 3 o mas caracteres, porque los espacios
 * los suprime la funcion "Trim()"
 * 
 * El error que se devuelve seria 422 "invalid_title"
 */

function validarCrearTarea(datos: unknown): CrearTareaDto {
    if (typeof datos !== "object" || datos === null) {
        throw new AppError(400, "INVALID_BODY", "El cuerpo debe ser un objeto JSON");
    }
    const objeto = datos as Record<string, unknown>;
    
    if (typeof objeto.titulo !== "string" || objeto.titulo.trim().length < 3) {
        throw new AppError(422, "INVALID_TITLE", "El título debe tener al menos tres caracteres");
    }
    
    const prioridades = ["baja", "media", "alta"];
    if (typeof objeto.prioridad !== "string" || !prioridades.includes(objeto.prioridad)) {
        throw new AppError(422, "INVALID_PRIORITY", "La prioridad no es válida");
    }
    
    return {
        titulo: objeto.titulo.trim(),
        prioridad: objeto.prioridad as CrearTareaDto["prioridad"]
    };
}