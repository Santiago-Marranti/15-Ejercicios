/**
 * 1. ¿Qué valor toma la variable id y qué respuesta devuelve la API si el cliente realiza 
 * una petición a GET /api/v1/tareas/abc?
 * 
 * La variable ID toma "abc" como valor. La api devuelve codigo 400 "El identificador no es valido".
 * 
 * 
 * 2. ¿Por qué se valida que el ID sea un entero positivo mayor a cero antes 
 * de invocar la capa de servicio?
 * 
 * En realidad se valida que sea cero o un entero mayor, porque los ID o identificadores siempre son
 * positivos. Si esto no se hiciese podria generar un error al realizar una consulta.
 * 
*/

app.get("/api/v1/tareas/:id", (req, res) => {
    const id = Number(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError(400, "INVALID_ID", "El identificador no es válido");
    }
    
    const tarea = service.obtenerPorId(id);
    res.status(200).json({ data: tarea });
});