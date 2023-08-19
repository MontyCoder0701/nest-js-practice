import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jtwService: JwtService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies['jwt'];

    if (!this.jtwService.verify(jwt)) {
      throw new UnauthorizedException('Invalid token!');
    }

    return next.handle();
  }
}

// constructor injects the jwt service
