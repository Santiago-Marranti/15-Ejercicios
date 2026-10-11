/**
 * 1. ¿Por qué el campo id, completada y fechaCreacion están ausentes en la interfaz CrearTareaDto 
 * pero presentes en la interfaz Tarea?
 * 
 * Esta diferencia responde al principio de separación de contratos entre el cliente y el servidor:
 * 
 * CrearTareaDto (Data Transfer Object): Define exclusivamente los datos mínimos necesarios que el cliente
 * tiene permitido enviar al momento de realizar una petición de creación (POST). El cliente solo se encarga 
 * de definir el contenido funcional de la tarea (titulo y prioridad).
 * 
 * Tarea (Entidad Completa): Representa el modelo de datos final y completo que vive en el 
 * servidor y la base de datos. Este incluye todos los metadatos generados automáticamente por 
 * el sistema que el cliente no debe ni puede proveer por sí mismo (el identificador único id, 
 * el estado inicial por defecto completada: false, y la marca temporal fechaCreacion).
 * 
 * 2. ¿En qué capa del sistema (Controller, Service o Repository) se deben generar el id 
 * y la fechaCreacion al registrar una nueva tarea, y por qué no deben ser provistos por el cliente HTTP?
 * 
 * Capa de generación:
 * El id se genera autónomamente en la Capa de Persistencia (Repository o motor de Base de Datos) 
 * mediante mecanismos automáticos (como AUTOINCREMENT en SQLite o contadores internos en memoria).
 * 
 * La fechaCreacion y el estado inicial suelen establecerse en la Capa de Servicio o en el Repositorio utilizando la fecha actual del servidor (new Date().toISOString()).
 * 
 * Por qué el cliente no debe proveerlos:
 * Seguridad e integridad (Evitar IDOR / Colisiones): Si el cliente pudiera enviar su propio id, 
 * podría intentar sobrescribir recursos de otros usuarios, provocar colisiones de claves duplicadas 
 * o manipular registros ajenos.
 * 
 * Confiabilidad temporal: Permitir que el cliente envíe la fechaCreacion comprometería la auditoría del
 * sistema, ya que un cliente malintencionado o con el reloj desincronizado podría estampar fechas falsas, 
 * futuras o pasadas. El servidor es la única autoridad confiable para certificar cuándo ocurrió un evento.
 */

export interface CrearTareaDto {
    titulo: string;
    prioridad: "baja" | "media" | "alta";
}

export interface Tarea {
    id: number;
    titulo: string;
    prioridad: "baja" | "media" | "alta";
    completada: boolean;
    fechaCreacion: string;
}
