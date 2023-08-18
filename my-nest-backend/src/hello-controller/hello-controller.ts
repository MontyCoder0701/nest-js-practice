import { Controller, Get } from '@nestjs/common';

@Controller('your-endpoint')
export class HelloController {
  @Get()
  getHello(): string {
    return JSON.stringify({ message: 'Hello from your backend!' });
  }
}
