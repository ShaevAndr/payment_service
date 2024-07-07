import { Controller, UseGuards } from "@nestjs/common";
import { PaymentGuard } from "./guards/payment.guard";
import { GetBalanceDto } from "./dto/getBalance.dto";
import { PaymentService } from "./payment.service";
import { GrpcMethod } from "@nestjs/microservices";

@Controller()
@UseGuards(PaymentGuard)
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService
    ) { }

    @GrpcMethod('paymentService', 'getBallance')
    public async getBallance(payload: GetBalanceDto) {
        return await this.paymentService.getBallance(payload)
    }
}