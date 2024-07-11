import { RequestSessions, ResponseSessions, SessionInfo } from "@/proto/payment";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class OrdersInfoRequestDto implements RequestSessions {
    @IsArray()
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    id: string[];
}