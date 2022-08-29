import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_TYPE, DATABASE_HOST } from './typeorm.constants';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DATABASE_TYPE,
      useFactory: async (configService: ConfigService) => {
        const ret: TypeOrmModuleOptions = {
          type: DATABASE_TYPE, // cnf.mariadbType,
          host: DATABASE_HOST, //configService.get<string>('host'),
          username: 'postgres', // configService.get<string>('mariadbUserName'),
          password: 'devVagas@DevClub2022', //configService.get<string>('mariadbPassword'),
          port: 5432, //configService.get<number>('mariadbPort'),
          database: 'dev-vagas', //configService.get<string>('mariadbDatabase'),
          entities: ['../../../../modules/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: false,
        };
        return ret;
      },
      inject: [],
    }),
  ],
})
export class DatabaseModule {}
