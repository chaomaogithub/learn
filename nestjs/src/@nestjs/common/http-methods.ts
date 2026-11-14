import 'reflect-metadata';

export function Get(path: string = ''): MethodDecorator {
    /**
     * target: 目标对象，即类的原型对象
     * propertyKey: 方法名，即被装饰的方法的名称
     * descriptor: 方法的描述符对象，包含了方法的属性和行为
     */
    return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, descriptor.value);
        Reflect.defineMetadata('method', 'GET', descriptor.value);
    }
}