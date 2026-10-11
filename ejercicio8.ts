
/**
 * 1. Si el cliente realiza una petición con los parámetros ?page=3&limit=5, 
 * ¿cuáles serán los valores de start y end en el método slice?
 * 
 * Valores de start y end para ?page=3&limit=5
 * Siguiendo paso a paso las operaciones matemáticas del código:
 * 
 * Página (page): Math.max(3 || 1, 1) da como resultado 3.
 * 
 * Límite (limit): Math.min(Math.max(5 || 10, 1), 100) da como resultado 5.
 * 
 * Inicio (start): (3 - 1) * 5 = 10.
 * 
 * Fin (end): 10 + 5 = 15.
 * 
 * Resultado: start será 10 y end será 15. En el método .slice(10, 15), esto devolverá los elementos correspondientes a la tercera página (desde el índice 10 hasta el 14 inclusive).
 * 
 * 2. ¿Qué efecto tienen las funciones Math.max y Math.min si el cliente envía valores 
 * negativos o muy elevados como ?page=-2&limit=5000?
 * 
 * Efecto de Math.max y Math.min ante valores extremos (?page=-2&limit=5000)
 * 
 * Estas funciones actúan como barreras de seguridad y robustez para blindar la API 
 * frente a parámetros maliciosos o erróneos enviados por el cliente:
 * 
 * Efecto de Math.max en la página (page = -2): Aunque el cliente envíe un número negativo, 
 * Math.max(-2, 1) compara ambos valores y fuerza a que el valor mínimo sea 1. Esto evita que se generen 
 * índices de inicio negativos (start negativo), lo cual rompería la lógica del array o daría resultados inesperados.
 * 
 * Efecto de Math.min en el límite (limit = 5000): El cálculo pasa por Math.max(5000, 1) (que resulta en 5000), 
 * pero luego se evalúa Math.min(5000, 100). Esto capa o limita el valor a un máximo estricto de 100. 
 * Es una medida de seguridad fundamental para evitar ataques de denegación de servicio (DoS) o consumo masivo de 
 * memoria que ocurriría si un usuario intentara solicitar 5,000 o 1,000,000 de registros en una sola petición.

 */


/** Fragmento del servicio para consultar una colección paginada */

const page = Math.max(Number(request.query.page) || 1, 1);
const limit = Math.min(
    Math.max(Number(request.query.limit) || 10, 1),
    100
);

const start = (page - 1) * limit;
const end = start + limit;

const tareasPaginadas = todasLasTareas.slice(start, end);