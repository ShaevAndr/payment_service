import { BalanceResponseDto } from "@/modules/payment/dto/getBalance.dto";
import { BalanceResponse } from "../../interfaces/balance";

export const transformBalanceResponse = (response: BalanceResponse): BalanceResponseDto => {
    if (response.error) {
        return {
            status: 'error',
            error: {
                code: response.error.code,
                description: response.error.description
            }
        }
    }
    const wallets = response.wallets.map(wallet => ({
        amount: wallet.amount_details.amount,
        currency: wallet.amount_details.currency
    }))
    return {
        status: 'ok',
        wallets
    }

}