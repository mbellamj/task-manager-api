import {
  BadRequestException,
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { SwaggerService } from './services/swagger/swagger.service';
import { swagger } from './swagger';

export class Server {
  private readonly logger = new Logger(Server.name);

  public static new() {
    return new Server();
  }

  public async run() {
    const app = await NestFactory.create(AppModule);

    const reflector = app.get(Reflector);

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
        exceptionFactory: (errors) => new BadRequestException(errors),
      }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalGuards(new JwtAuthGuard(reflector));

    const swaggerService = new SwaggerService(app);

    swaggerService.setupGlobalDocument(swagger);

    const configService = app.get(ConfigService);

    await app.listen(configService.get<number>('app.port')!);

    const url = await app.getUrl();

    configService.set('app.host', url);

    this.logger.log(`Server running on ${url}`);
  }
}
