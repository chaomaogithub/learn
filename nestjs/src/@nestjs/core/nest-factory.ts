import { NestApplication } from './nest-application'
import { Logger } from './log';

export class NestFactory {
    static async create(module: any): Promise<any> {
        // Simulate the creation of a NestJS application instance
        Logger.log(`Starting Nest application....`, 'NestFactory');

        const app = new NestApplication(module);

        return app;
    }
}