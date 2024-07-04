import { Status, WalletDetails, Error } from "."

export interface BalanceRequest {
    request_datetime: string
}

export interface BalanceResponse {
    status: 'error' | 'ok'
    wallets?: Array<WalletDetails>
    error?: Error
}

