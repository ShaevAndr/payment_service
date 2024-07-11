import { Module } from '@nestjs/common';
import { PaymentGuard } from './guards/payment.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PaymentController } from './payment.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { BanksFactory } from '../banks/banks.factory';
import { PaymentService } from './services/payment.service';


@Module({
    imports: [
        BanksFactory,
        ClientsModule.register([
            {
                name: 'PAYMENT_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'payment',
                    protoPath: join(__dirname, './proto/payment.proto'),
                },
            },
        ]),],
    providers: [PaymentGuard, OrdersRepository],
    controllers: [PaymentController, PaymentService],
})
export class PaymentModule { }
