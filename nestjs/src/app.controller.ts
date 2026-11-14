import { Controller, Get } from '@nestjs/common';

@Controller('/cat')
export class AppController {
    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}

/**
 * 控制器是处理传入HTTP请求的核心组件，每个控制负责处理特定的请求路径和对应的 HTTP 方法。
 * 在控制器的内部会使用路由装饰器（如 @Get、@Post、@Put、@Delete 等）来定义处理请求的方法。
 * 这些方法会接收请求参数、请求体等信息，并返回响应数据。
 * 控制器通常会调用服务层（Service）来处理业务逻辑，从而实现请求的处理和响应的生成。
 */