export class Logger {

    public static log(creep: Creep, message?: any, ...optionalParams: any[]): void {
        if (creep.memory.logging.active) {
            console.log(message, optionalParams);
        }
    }
}
