import { BadRequestException, Controller, Inject, forwardRef } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ResetService } from './reset.service';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class ResetController {
    constructor(
        private resetService: ResetService,
        private mailerService: MailerService,
        @Inject(forwardRef(() => AuthService))
        private authService: AuthService,
    ) { }

    @Post('forgot')
    async forgot(@Body('email') email: string) {
        const token = Math.random().toString(20).substring(2, 12);
        await this.resetService.create({ email, token });

        const url = `http://localhost:4200/reset/${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `click <a href="${url}">here</a> to reset your password`,
        });
        return { message: 'Check your email for the password reset link!' };
    }

    @Post('reset')
    async reset(
        @Body('token') token: string,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        if (password !== password_confirm) {
            throw new BadRequestException('Password does not match!');
        }

        const reset = await this.resetService.findOneByToken(token);
        const email = reset.email;
        const user = await this.authService.findOneByEmail(email);

        if (!user) {
            throw new BadRequestException('Email does not exist!');
        }

        const hashed_password = await bcrypt.hash(password, 12);
        await this.authService.update(user.id, { password: hashed_password });

        return { message: 'Password successfully changed!' };
    }
}

// controller handles the requests and responses, then sends it to the service
