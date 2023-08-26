import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const password = process.env.DB_PASSWORD;

export const TypeORMMySqlTestingModule = (entities: any[]) =>
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: password,
        database: 'nest_auth',
        autoLoadEntities: true,
        synchronize: true,
    });
