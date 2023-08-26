import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import * as dotenv from 'dotenv';

dotenv.config();
const password = process.env.DB_PASSWORD;

@Module({
    imports: [
        CoreModule,
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
        FeatureModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
