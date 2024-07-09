import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class Service {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;
}