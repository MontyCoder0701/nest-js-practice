import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller()
export class ResetController {
    constructor(private resetService: ResetService) { }

    @Post('forgot')
    async forgot(@Body('email') email: string) {
        const token = Math.random().toString(20).substring(2, 12);
        await this.resetService.create({ email, token });
        return { message: 'Check your email for the password reset link!' };
    }
}

// controller handles the requests and responses, then sends it to the service
