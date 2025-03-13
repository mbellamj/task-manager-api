import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        logging: ['error', 'migration', 'schema', 'info'],
        synchronize: !configService.get<boolean>('app.isProduction'),
        migrationsRun: true,
        autoLoadEntities: true,
        migrationsTableName: 'task_manager_migration_table',
        entities: ['dist/**/*.entity.{ts,js}'],
        seeds: [__dirname + '/seeds/**/*.{ts,js}'],
        factories: [__dirname + '/factories/**/*.{ts,js}'],
        cli: {
          migrationsDir: __dirname + '/migrations/',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
