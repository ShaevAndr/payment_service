import { Controller, UseGuards } from "@nestjs/common";
import { PaymentGuard } from "./guards/payment.guard";
import { GetBalanceDto } from "./dto/getBalance.dto";
import { PaymentService } from "./payment.service";
import { GrpcMethod } from "@nestjs/microservices";
import { CheckSelfEmployedDtoRequest } from "./dto";

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

    @GrpcMethod('paymentService', 'CheckSelfEmployed')

    public async checkSelfEmployed(taxReference: CheckSelfEmployedDtoRequest) {
        return await this.paymentService.checkSelfEmployed(taxReference)
    }
}