import 'reflect-metadata';

interface ControllerOptions {
    prefix?: string;
}

// 路径前缀可以为空，也可以是一个字符串，表示该控制器处理的请求路径前缀。


export function Controller(): ClassDecorator
export function Controller(prefix: string): ClassDecorator
export function Controller(options: ControllerOptions): ClassDecorator
export function Controller(prefixOptions?: string | ControllerOptions): ClassDecorator {
    let options: ControllerOptions = {};
    if (typeof prefixOptions === 'string') {
        options.prefix = prefixOptions;
    } else if (typeof prefixOptions === 'object') {
        options = prefixOptions;
    }

    return function (target: Function) {
        Reflect.defineMetadata('prefix', options.prefix || '', target);
    }
}