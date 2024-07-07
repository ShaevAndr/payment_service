import { Module } from '@nestjs/common';
import { Bank131 } from './bank131/bank131.service';
import { BanksFactory } from './banks.factory';

@Module({
    imports: [],
    providers: [Bank131, BanksFactory],
})
export class Bank131Module { }
