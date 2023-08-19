import { Controller, Get, Post, Body, BadRequestException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller()
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
    ) {

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

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.authService.findOneByEmail(email);

        if (!user) {
            throw new BadRequestException('Email does not exist!');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Wrong password!');
        }

        const jtw = await this.jwtService.signAsync({ id: user.id });
        response.cookie('jwt', jtw, { httpOnly: true });

        return user;
    }

    @Get('user')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        return this.authService.findOneById(data.id);
    }

}

// controller handles the request and response
// constructor injects the service into the controller  
// controller uses the AuthService (for database manipulation) and JwtService (for token)
