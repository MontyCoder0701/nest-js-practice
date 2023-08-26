import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { AuthModule } from 'src/core/auth/auth.module';
import { TodoEntity } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([TodoEntity])],
    providers: [TodoService],
    controllers: [TodoController],
})
export class TodoModule {}
