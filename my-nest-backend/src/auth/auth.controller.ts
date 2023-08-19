import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('register')
    async register(@Body() body: RegisterDto) {

        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Password does not match!');
        }

        const hashed = await bcrypt.hash(body.password, 12);
        body.password = hashed;
        return this.authService.create(body);
    }
}
