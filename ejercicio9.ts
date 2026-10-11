/**
 * 1. Identifica las responsabilidades mezcladas en este bloque de código y menciona qué capas de la 
 * arquitectura modular (Router, Controller, Service, Repository) se están omitiendo o salteando.
 * 
 * Responsabilidades mezcladas y capas omitidas
 * 
 * En este bloque de código se están mezclando tres responsabilidades que deberían estar estrictamente separadas:
 * 
 * - Manejo de infraestructura HTTP: Capturar parámetros de la petición y enviar la respuesta JSON.
 * - Acceso a datos (Persistencia): Buscar un elemento dentro de una estructura de almacenamiento (baseDeDatosMemoria.find(...)).
 * - Lógica de negocio: Calcular y mutar el estado del recurso (tarea.vistas = (tarea.vistas || 0) + 1).
 * 
 * Capas omitidas:
 * Se están salteando por completo el Controller, el Service y el Repository. 
 * El Router está asumiendo las responsabilidades de toda la arquitectura (lo que comúnmente se conoce como código espagueti),
 * lo que vuelve al código imposible de probar unitariamente, difícil de mantener y altamente acoplado.
 * 
 * 2. Indica cuál debería ser la única responsabilidad del Router y del Controller en este flujo.
 * 
 * Única responsabilidad del Router y del Controller
 * 
 * Para corregir esta violación arquitectónica bajo el patrón Layered Architecture, cada capa debe cumplir un rol específico:
 * 
 * Responsabilidad única del Router:
 * Su único trabajo es mapear la URL y el verbo HTTP hacia el método correspondiente del controlador. 
 * No debe contener lógica ni tocar peticiones directamente.
 * (Ejemplo: router.get("/:id", controller.obtenerPorId);)
 * 
 * Responsabilidad única del Controller:
 * Su único trabajo es gestionar el contexto HTTP. Esto incluye extraer y validar los datos de entrada
 * (req.params, req.query, req.body), invocar al servicio correspondiente pasándole datos limpios, y 
 * encargarse de construir la respuesta HTTP final (o derivar errores al middleware global). 
 * No calcula reglas de negocio ni accede a bases de datos.
 * 
 */

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    // Acceso directo a la fuente de datos global/memoria
    const tarea = baseDeDatosMemoria.find(t => t.id === id);
    
    if (!tarea) {
        return res.status(404).json({ error: "No encontrada" });
    }
    
    // Regla de negocio ejecutada directamente en la ruta
    tarea.vistas = (tarea.vistas || 0) + 1;
    
    res.status(200).json({ data: tarea });
});