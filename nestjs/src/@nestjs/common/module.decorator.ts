import 'reflect-metadata';

// 模块的控制器
interface ModuleMetadata {
    controllers?: Function[];
}

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return function (target: Function) {
        // 给模块类添加元数据
        Reflect.defineMetadata('controllers', metadata.controllers || [], target);
    }
}