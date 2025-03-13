import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { TasklistModule } from './modules/tasklist/tasklist.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './services/database/database.module';
import { LoggingService } from './services/logging/logging.service';
import { ReadinessModule } from './services/readiness/readiness.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    DevtoolsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        http: configService.get<boolean>('app.isProduction'),
        port: configService.get<number>('app.devtoolPort')!,
      }),
    }),
    TasklistModule,
    TaskModule,
    UserModule,
    AuthModule,
    DatabaseModule,
    ReadinessModule,
  ],
  providers: [LoggingService],
  controllers: [],
})
export class AppModule {}
