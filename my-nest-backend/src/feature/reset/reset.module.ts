import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetEntity } from './reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from 'src/core/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ResetEntity]),
        MailerModule.forRoot({
            transport: {
                host: 'localhost',
                port: 1025,
            },
            defaults: {
                from: 'no-reply@localhost.com',
            },
        }),
        AuthModule,
    ],
    providers: [ResetService],
    controllers: [ResetController],
})
export class ResetModule {}

// module is a collection of controllers, entity, and services
// typeorm module is imported to be able to use the repository
