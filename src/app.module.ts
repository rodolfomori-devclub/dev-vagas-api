import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SsoModule } from './modules/sso/sso.module';
// import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './infrastructure/typeorm/typeorm.module';
import configuration from 'src/config/configuration'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    // isGlobal: true,
    // load: [configuration],
    // }),
    DatabaseModule,
    SsoModule,
    AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
