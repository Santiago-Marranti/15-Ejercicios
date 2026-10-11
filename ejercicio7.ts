/**
 * 1. ¿Qué problema de acoplamiento presenta la
 *  instanciación interna con new TareasRepository() y new 
 *  TareasService() dentro del constructor?
 * 
 * El principal problema es el acoplamiento fuerte (tight coupling) y la rigidez estructural:
 * 
 * - Dependencia de implementaciones concretas: Al usar new dentro del constructor, la clase TareasController 
 * deja de ser independiente y se ata rígidamente a clases específicas (TareasRepository y TareasService).
 * No puede reutilizarse con otras implementaciones (por ejemplo, si en el futuro quisieras cambiar el motor de persistencia o 
 * usar un servicio desacoplado).
 * 
 * - Imposibilidad de aislar para pruebas unitarias: Al crearse las instancias de forma oculta e interna, es imposible inyectar datos
 * falsos (mocks o stubs) desde afuera. El controlador obligatoriamente intentará ejecutar la lógica real y golpear la base de datos 
 * real, destruyendo la capacidad de hacer pruebas unitarias rápidas y limpias.
 * 
 * Violación de SOLID (Principio de Inversión de Dependencias - DIP): Los módulos de alto nivel (controladores) 
 * dependen directamente de los detalles de bajo nivel (repositorios/servicios concretos) en lugar de depender de 
 * abstracciones.
 * 
*/

/** Codigo Original */
export class TareasController {
    private service: TareasService;

    constructor() {
        const repository = new TareasRepository();
        this.service = new TareasService(repository);
    }

    public obtenerTodas = (_req: Request, res: Response) => {
        const data = this.service.obtenerTodas();
        res.status(200).json({ data });
    }
}

/** Codigo Refactorizado */

/**
 * ¿Cómo facilita esto las pruebas unitarias con mocks?
 * Gracias a la inyección por constructor, al momento de escribir el archivo de prueba unitaria
 * para el controlador, podés crear un servicio simulado (mock) y pasárselo por parámetro sin que el 
 * controlador note la diferencia.
 * 
 * Esto permite probar de forma aislada y en milisegundos que el controlador responde con el código HTTP 
 * correcto y el formato JSON esperado, sin depender de bases de datos, archivos reales ni lógica de negocio externa.
 * 
 */


export class TareasController {
    // Inyectamos el servicio mediante el constructor
    constructor(private readonly service: TareasService) {}

    public obtenerTodas = (_req: Request, res: Response) => {
        const data = this.service.obtenerTodas();
        res.status(200).json({ data });
    }
}