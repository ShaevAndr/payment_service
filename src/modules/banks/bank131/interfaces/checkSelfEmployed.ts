import { Error } from './common'
export interface CheckSelfEmployedRequest {
    tax_reference: string
}

type Status = 'error' | 'ok' | 'pending'

export interface CheckSelfEmployedResponse {
    status: Status
    request_id: string
}

export interface EmployedStatusResponse {
    status: Status
    is_professional_income_taxpayer: boolean
    is_linked: boolean
    error: Error
}
export interface EmployedStatusRequest {
    request_id: string
}