import { Controller, Get, Post } from '@nestjs/common';

@Controller('your-endpoint')
export class HelloController {
  @Post()
  postHello(): string {
    return JSON.stringify({ message: 'Reply from your backend!' });
  }
}
