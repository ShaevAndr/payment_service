import { Inject, Injectable } from "@nestjs/common";
import { Bank131 } from "./bank131/bank131.service";
import { Bank } from "@/core/interfaces/bank.interface";
import { Banks } from "./lib";

@Injectable()
export class BanksFactory {
    constructor(
        @Inject(Bank131.name) private readonly bank131: Bank
    ) { }

    public getBank(bankName?: Banks): Bank {
        switch (bankName) {
            case Banks.Bank131:
                return this.bank131
            default:
                return this.bank131
        }
    }
}