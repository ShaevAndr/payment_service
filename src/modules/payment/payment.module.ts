import { Module } from '@nestjs/common';
import { PaymentGuard } from './guards/payment.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PaymentRepository } from './payment.repository';
import { PaymentController } from './payment.controller';
import { BanksFactory } from '../banks/banks.factory';
import { PaymentService } from './payment.service';

@Module({
    imports: [
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
    providers: [PaymentGuard, PaymentRepository, BanksFactory, PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule { }
