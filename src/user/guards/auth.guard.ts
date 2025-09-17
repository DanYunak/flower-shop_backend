import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from "rxjs";
import { ExpressRequestInterface } from '../../types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<ExpressRequestInterface>()

        if (request.user) {
            return true
        }

        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
    }
}