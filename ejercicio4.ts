/**
 * 1. Si el cliente envía a PUT /api/v1/tareas/5 únicamente el cuerpo 
 * {"completada": true}, ¿cuál es el comportamiento esperado 
 * según la especificación HTTP REST y qué problema ocurre 
 * con la entidad?
 * 
 * Se espera que los datos que ingresa el cliente reemplazen a los que estan en la base de datos.
 * Asi lo dice el metodo PUT, actualiza un registro reemplazando todos sus datos previos por los nuevos.
 * 
 * El problema en este caso seria que solo se especifica completada como verdadero, pero el registro al que
 * se dirige, por no haber verificaciones de que los datos esten completos, puede corromper los datos que ya
 * existian, pisando un "Matematica II" por un "null" o undefined. 
 * 
 * 2. Explica el concepto de idempotencia en el contexto de las operaciones PUT y POST.
 * 
 * PUT es Idempotente
 * Por qué: Como PUT se define semánticamente como un reemplazo total 
 * (o creación si no existe) utilizando un identificador fijo, no importa cuántas veces envíes exactamente la 
 * misma petición PUT /api/v1/tareas/5.
 * Resultado: La primera vez actualizará el recurso; la segunda, tercera y décima vez volverán a escribir
 *  exactamente los mismos datos encima. El estado final de la tarea 5 no cambia por repetirlo.
 * 
 * 2. POST NO es Idempotente
 * Por qué: Semánticamente, POST está diseñado para crear nuevos recursos donde el servidor asigna el 
 * identificador automático.Resultado: Si ejecutás la misma petición POST /api/v1/tareas tres veces 
 * seguidas con el mismo JSON, el servidor interpretará que querés crear tres recursos distintos.
 *  El resultado final serán tres tareas nuevas creadas en la base de datos con IDs diferentes 
 * (por ejemplo, los IDs 10, 11 y 12).

 */

// Endpoint A
app.put("/api/v1/tareas/:id", (req, res) => {
    const { titulo, prioridad, completada } = req.body;
    const tareaActualizada = service.reemplazar(Number(req.params.id), { titulo, prioridad, completada });
    res.status(200).json({ data: tareaActualizada });
});

// Endpoint B
app.patch("/api/v1/tareas/:id", (req, res) => {
    const cambios = req.body;
    const tareaModificada = service.actualizarParcial(Number(req.params.id), cambios);
    res.status(200).json({ data: tareaModificada });
});
