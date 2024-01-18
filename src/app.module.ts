import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StructureModule } from './structure/structure/structure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ////env variables are created when starting the app. check scripts in package json.
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TaskModule,
    StructureModule,
    ///waiting for config module, so its async, to get variables from specifig stage (dev or prod)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configurationService: ConfigService) => {
        const isProd = configurationService.get('STAGE') === 'prod';
        return {
          ssl: isProd,
          extra: {
            ssl: isProd ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configurationService.get('DB_HOST'),
          port: configurationService.get('DB_PORT'),
          username: configurationService.get('DB_USERNAME'),
          password: configurationService.get('DB_PASSWORD'),
          database: configurationService.get('DB_DATABASE'),
        };
      },
    }),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
