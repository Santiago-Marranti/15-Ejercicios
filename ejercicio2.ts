/**
 * 1. ¿Por qué la aserción de tipo as CrearTareaDto NO garantiza la
 *  validez de los datos recibidos en runtime?
 * 
 * Porque pueden llegar letras por numeros, valores nulos, undefineds, etc. Typescript permite definir
 * tipos de variables, pero en tiempo de ejecucion no asegura de que se cumpla con esto y las variables
 * de javascript pueden tomar cualquier valor.
 * 
 * 
 * 2. ¿Qué vulnerabilidades o fallos en ejecución pueden ocurrir si el cliente envía un JSON malformado o 
 *  incompleto (ej. {} o {"titulo": 123})?
 * 
 * El servidor podria guardar datos corruptos con tipos que no corresponden en la base de datos (un number donde se esperaba 
 * un string) rompiendo asi la consistencia.
 * 
 * ademas si falla la logica, el servidor se podria caer con un codigo de error http de 500 (Internal server error).
 * Quedaria asi fuera de servicio.
 * 
 */

import { Request, Response } from 'express';
import { CrearTareaDto } from './tarea.dto';

export function crearTareaController(req: Request, res: Response) {
    const datos = req.body as CrearTareaDto; 
    
    // El desarrollador asume que 'datos' ya tiene la estructura válida de CrearTareaDto
    const nuevaTarea = tareasService.crear(datos);
    return res.status(201).json({ data: nuevaTarea });
}