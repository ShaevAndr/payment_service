import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToRpc().getContext();

        const metadata = request.metadata;
        console.log("ВЫЯСНИТЬ КАК ОРГАНИЗОВАНА АВТОРИЗАЦИЯ!!!")
        return true
    }
}