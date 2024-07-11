import { TokenizedCardResponseDto, BalanceResponseDto, CheckSelfEmployedDtoResponse, PaymentSessionRequestDto, PaymentActionsResponseDto, PaymentSessionResponseDto } from "@/modules/payment/dto"


export abstract class Bank {
    ROOT_URL: string
    getBalance:() => Promise<BalanceResponseDto> 
    checkSelfEmployed:(taxId: number)=> Promise<CheckSelfEmployedDtoResponse> 
    confirmPayout:(sessionId: string)=> Promise<PaymentActionsResponseDto> 
    cancelPayout:(sessionId: string)=> Promise<PaymentActionsResponseDto> 
    createSession:(request: PaymentSessionRequestDto)=> Promise<PaymentSessionResponseDto> 
    getTokenizeWidget:()=> Promise<TokenizedCardResponseDto> 


}