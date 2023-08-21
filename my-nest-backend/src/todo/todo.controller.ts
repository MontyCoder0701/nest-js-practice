import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';


@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private todoService: TodoService,
    ) { }

    @Post('create')
    async create(@Body() body: TodoDto, @Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        const user = await this.authService.findOneById(data.id);
        const todo = await this.todoService.create(body, user);
        return todo;
    }

    @Get()
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        return this.authService.findOneById(data.id);
    }
}
