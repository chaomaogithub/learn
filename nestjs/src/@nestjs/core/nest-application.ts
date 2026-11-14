import { Logger } from './log';
import express, { Express } from 'express';

export class NestApplication {
    private readonly app: Express = new express();
    constructor(protected readonly module: any) {

    }
    // 初始化工作
    async init(): Promise<void> {
        Logger.log(`AppMoudle dependencies initialized`, 'InstanceLoader');
        // 取出模块里所有的控制器，然后做好路由配置
        const controllers = Reflect.getMetadata('controllers', this.module) || [];

        for (const Controller of controllers) {
            // 创建每个控制器的实例
            const instance = new Controller();
            const prefix = Reflect.getMetadata('prefix', Controller) || '/';
            Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver');
        }
    }
    async listen(port: number): Promise<void> {
        await this.init();
        this.app.listen(port, () => {
            Logger.log(`Application is listening on port ${port}`, 'NestApplication');
        });
    }
}