/**
 * 1. ¿Qué riesgo de seguridad/encapsulamiento tiene la Opción A si un servicio o 
 * controlador modifica el arreglo devuelto (ej. haciendo repo.obtenerTodasA().pop())?
 * 
 * El principal riesgo es la ruptura total del encapsulamiento (Encapsulation Breakdown) y 
 * la mutación descontrolada del estado interno:

 * Mutación externa sin control: Como el método retorna this.tareas 
 * directamente, está entregando una referencia en memoria al arreglo privado 
 * del repositorio.
 * 
 * Corrupción de datos y efectos colaterales: Cualquier componente externo 
 * (un servicio o controlador) que invoque a ese método puede alterar la colección 
 * interna ejecutando métodos mutables como .pop(), .push(), .splice() o .sort() sin 
 * que el repositorio se entere ni valide nada. Esto provoca que el estado interno del 
 * repositorio quede corrupto, generando bugs silenciosos e impredecibles en
 * toda la aplicación.
 * 
 * 2. ¿Cómo soluciona la Opción B este problema mediante el operador de propagación (spread operator)?
 * 
 * La Opción B soluciona este problema creando una copia superficial (shallow copy) del 
 * arreglo mediante el operador de propagación ([...this.tareas]):
 * 
 * Aislamiento de referencias: Al envolver el arreglo con corchetes y 
 * puntos suspensivos, JavaScript crea un nuevo objeto arreglo en 
 * memoria que contiene los mismos elementos, pero cuya estructura 
 * externa es completamente independiente del arreglo privado del repositorio.
 * 
 * Protección del estado: Si un componente externo modifica este nuevo arreglo (por ejemplo, 
 * eliminando o agregando elementos con .pop()), solo estará alterando su copia local. 
 * El arreglo original (this.tareas) dentro del repositorio permanece intacto y blindado, 
 * manteniendo la integridad del almacenamiento en memoria.
 * 
 * (Nota: Al ser una copia superficial, si bien protege la estructura de la colección, 
 * los objetos internos siguen compartiendo referencia, por lo que una buena práctica avanzada es 
 * retornar clones profundos si se requiere inmutabilidad total de los elementos).
 * 
 */

export class TareasRepository {

    private readonly tareas: Tarea[] = [];



    // Opción A

    obtenerTodasA(): Tarea[] {

        return this.tareas;

    }



    // Opción B

    obtenerTodasB(): Tarea[] {

        return [...this.tareas];

    }

}