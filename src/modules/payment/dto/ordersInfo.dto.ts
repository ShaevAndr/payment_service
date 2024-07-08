import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class OrdersInfoRequestDto {
    @IsArray()
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    readonly orderId: number
}

export class OrdersInfoResponseDto {
    readonly orders: OrderInfo
}

class OrderInfo {
    readonly status: string
    readonly paymentDate: string
    readonly paymenDestinztion: string
    readonly description: string[]
    readonly recipientFullName: string
    readonly reciept: string
    readonly recipientId: string

}