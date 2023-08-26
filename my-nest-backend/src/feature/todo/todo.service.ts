import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { Todo } from './todo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/auth/models/user.interface';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoRepository: Repository<TodoEntity>,
    ) {}

    async create(todo: Todo, user: User): Promise<Todo> {
        todo.user = user;
        const createdTodo = await this.todoRepository.save(todo);
        return createdTodo;
    }

    async readAll(user: User): Promise<Todo[]> {
        const todos = await this.todoRepository.find({
            where: { user: user },
            order: { date: 'DESC' },
        });
        return todos;
    }

    async delete(id: number): Promise<any> {
        const deletedTodo = await this.todoRepository.delete({ id: id });
        return deletedTodo;
    }
}
