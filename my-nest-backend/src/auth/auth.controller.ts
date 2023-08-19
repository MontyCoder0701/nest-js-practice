import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {

        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Password does not match!');
        }

        const hashed = await bcrypt.hash(body.password, 12);
        body.password = hashed;
        return this.authService.create(body);
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        const user = await this.authService.findOneByEmail(email);

        if (!user) {
            throw new BadRequestException('Email does not exist!');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Wrong password!');
        }

        return user;
    }
}

// controller handles the request and response
// constructor  injects the service into the controller 
// controller uses the service to create a user in the database
// controller uses the dto to validate the request body
