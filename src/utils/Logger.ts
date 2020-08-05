export class Logger {

    public static log(creep: Creep, message?: any, ...optionalParams: any[]): void {
        if (creep.memory.logging) {
           console.log(message, optionalParams);
        } else creep.memory.logging = false;
    }
}
