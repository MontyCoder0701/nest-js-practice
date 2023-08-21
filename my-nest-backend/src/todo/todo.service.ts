import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { Todo } from './todo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/user.interface';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>
    ) { }

    async create(todo: Todo, user: User): Promise<Todo> {
        todo.user = user;
        const createdTodo = await this.todoRepository.save(todo);
        return createdTodo;
    }
}
