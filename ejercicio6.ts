/**
 * 1. ¿Por qué es fundamental filtrar por error instanceof AppError antes de retornar la respuesta?
 * 
 * Porque permite distinguir entre errores operacionales (controlados) y errores de sistema o de programacion
 * (no controlados).
 * 
 * Manejo de errores esperados (AppError): Son aquellos que el servidor anticipa durante su flujo normal
 * (por ejemplo: validaciones de formularios fallidas, recursos no encontrados, falta de autenticacion).
 * Estos errores contienen metadatos controlados como un codigo HTTP especifico (400, 404, 401) y mensajes
 * diseñados para ser entendidos por los clientes.
 * 
 * Aislamiento de fallos inesperados: Si no se filtrara, cualquier error imprevisto (un error de sintaxis
 * en el codigo, un fallo de red o un puntero nulo) podria romper el flujo de la aplicacion o devolver
 * respuestas inconsistentes.
 * 
 * 2. ¿Por qué NO se deben retornar el stack trace (traza de pila) ni detalles técnicos de errores no controlados (como un fallo de conexión a BDD) en la respuesta JSON enviada al cliente final?
 * 
 * Seguridad de la aplicación (Information Disclosure): Un stack trace expone la estructura interna 
 * de los directorios del servidor, las versiones exactas de las librerías instaladas, fragmentos 
 * de código y el motor de la base de datos. Esta información es utilizada por atacantes 
 * malintencionados para mapear vulnerabilidades y planificar ataques dirigidos.
 * 
 * Experiencia de usuario (UX) deficiente: Los detalles técnicos de una base de datos o un error 
 * de código no tienen ningún significado útil para el usuario final. Lo profesional es mantener 
 * una interfaz limpia con un mensaje genérico ("Ocurrió un error interno"), mientras que el error
 *  real se registra de forma segura en los servidores (console.error(error) o en sistemas de 
 * monitoreo como Sentry o Datadog) para que los desarrolladores puedan depurarlo sin comprometer 
 * la seguridad ni la confianza del usuario.

*/

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    if (error instanceof AppError) {
        response.status(error.status).json({
            error: { code: error.code, message: error.message, details: error.details }
        });
        return;
    }
    
    console.error(error);
    response.status(500).json({
        error: { code: "INTERNAL_ERROR", message: "Ocurrió un error interno" }
    });
};