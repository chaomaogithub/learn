import cls from 'cli-color'

export class Logger {
    private static lastLogTime: number = Date.now();
    static log(message: string, context: string = ''): void {
        const timestamp = new Date().toLocaleString()
        const pid = process.pid
        const currentTime = Date.now()
        const timeDiff = currentTime - Logger.lastLogTime;
        console.log(cls.blue(`[${cls.green('Nest')}] ${cls.green(pid.toString())} - ${cls.yellow(timestamp)} ${cls.green('LOG')}] [${cls.yellow(context)}] ${message} ${cls.green(`+${timeDiff}ms`)}`));
        Logger.lastLogTime = currentTime;
    }
}