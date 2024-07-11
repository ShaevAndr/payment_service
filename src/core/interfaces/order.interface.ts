interface Payment {
    id: string;
    payment_id: string; 
    status: number | null;  
    amount: number; 
    type: string; 
    card_hash?: string | null;  
    recipient_bank_bik?: string | null;  
    recipient_tax_number: string
    payer_id: string; 
    payer_type: string; 
    payer_name: string; 
    payer_tax_number: string;
    created_at: Date;
    updated_at: Date;
    session: string;
    fiscalization_receipt_url?: string | null;
  }