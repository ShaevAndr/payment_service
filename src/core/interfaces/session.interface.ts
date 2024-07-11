import { IPaymentOrder } from "./paymentOrder.interface";

export interface ISession {
  id?: string;
  session_id: string;
  status: number;
  created_at?: Date;
  updated_at?: Date;
  description?: string;
}

export interface ISessionWithOrders extends ISession {
  orders: Partial<IPaymentOrder>[];
}