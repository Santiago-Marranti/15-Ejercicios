/**
 * Preguntas:
 * 1. ¿Cuál es el propósito del encabezado HTTP Location asignado en la respuesta a una petición POST exitosa?
 * 
 * El encabezado Location es un estándar de las especificaciones de HTTP/1.1 (RFC 7231) para respuestas de creación exitosa (201 Created):
 * 
 * Identificación unívoca del nuevo recurso: Informa al cliente de la URI/URL exacta donde puede consultar, 
 * leer o interactuar de forma individual con el recurso que se acaba de crear.
 * 
 * Semántica REST: En lugar de obligar al cliente a adivinar cómo construir la URL del nuevo recurso utilizando 
 * el id devuelto en el JSON, la API le proporciona la dirección completa y formal.
 * 
 * Utilidad para clientes automatizados: Permite que clientes HTTP automatizados, bots o librerías 
 * de consumo de APIs (API clients) sigan el recurso mediante hipermedios o redirecciones 
 * sin acoplarse al formato del cuerpo de la respuesta.
 * 
 * 2. ¿Por qué se recomienda envolver la entidad devuelta dentro de un objeto con la propiedad data 
 * (ej. { data: tarea }) en lugar de retornar la entidad directamente en la raíz de la respuesta JSON?
 * 
 * Esta práctica de diseño de APIs (conocida como JSON Response Enveloping) se recomienda por las siguientes razones clave:
 * 
 * Extensibilidad sin Breaking Changes: Si en el futuro querés añadir metadatos a la respuesta 
 * (por ejemplo: paginación, hipervínculos HATEOAS, marcas de tiempo o mensajes de estado), 
 * podés agregarlos como propiedades contiguas a data sin romper la estructura existente que 
 * el cliente ya consume:
 * 
    {
    "data": { "id": 1, "titulo": "Estudiar" },
    "meta": { "timestamp": 1700000000 },
    "links": { "self": "/api/v1/tareas/1" }
    }
 * (Si devolvieras la entidad en la raíz como { "id": 1, ... }, agregar metadatos requeriría 
 * cambiar la estructura completa del JSON, rompiendo los clientes).
 *
 * Consistencia del Contrato: Permite que todas las respuestas de la API compartan un mismo contrato 
 * raíz uniforme: las respuestas de éxito siempre tendrán la clave data (sea un objeto individual o 
 * una lista data: [...]), mientras que las respuestas de error siempre tendrán la clave error.
 * 
 * Seguridad frente a ataques de JSON Hijacking: Históricamente, devolver colecciones o arrays 
 * directos en la raíz ([...]) en lugar de un objeto envolvente ({ "data": [...] }) exponía las 
 * respuestas a vulnerabilidades de inyección de prototypes en ciertos motores JavaScript antiguos.

 */

// Considera la creación exitosa de un recurso en Express:
router.post("/", (request, response) => {
    const dto = validarCrearTarea(request.body);
    const tarea = service.crear(dto);
    response.location(`/api/v1/tareas/${tarea.id}`).status(201).json({ data: tarea });
});