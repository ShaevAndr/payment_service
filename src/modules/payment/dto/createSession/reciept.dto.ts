import { IsString } from 'class-validator';

export class RecieptDto {
    @IsString()
    id: string;

    @IsString()
    url: string;
}