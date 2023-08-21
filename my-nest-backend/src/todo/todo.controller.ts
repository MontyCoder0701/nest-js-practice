import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
    @Get()
    index() {
        return 'This action returns all todos';
    }

}
