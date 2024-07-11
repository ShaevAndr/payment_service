import { TokenRequest } from "@/proto/payment";
import { CommonResponseDto } from "./common.dto";
import { IsIn, IsOptional } from "class-validator";

export class TokenizedCardResponseDto extends CommonResponseDto {

    public public_token?: string
}

export class TokenizedCardRequestDto implements TokenRequest {
    @IsOptional()
    @IsIn(['bank131'])
    bank: string;
}