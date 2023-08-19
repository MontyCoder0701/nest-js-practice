import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello-controller/hello-controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const password = process.env.DB_PASSWORD;

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: password,
      database: 'nest_auth',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule { }
