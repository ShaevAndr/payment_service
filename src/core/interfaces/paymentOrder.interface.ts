export interface IPaymentOrder {
    id?: string;
    type: string;
    status: number;
    total_amount: number;
    description: string | null;
    payer_id: number;
    payer_type: string;
    payer_name: string;
    payer_tax_number: string;
    recipient_tax_number: string;
    recipient_bank_bik: string;
    created_at?: Date;
    updated_at?: Date;
    session_id: string;
    fiscalization_receipt_url?: string | null;
}
