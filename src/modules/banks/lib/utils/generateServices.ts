import { Service } from "@/modules/payment/dto/createSession/service.dto";
import { FiscalizationService } from "../../bank131/interfaces";

export const generateBodyServices = (services: Service[]): FiscalizationService[] => {
    return services.map(service => ({
        name: service.name,
        amount_details: {
            amount: service.amount,
            currency: 'rub'
        }
    }))
}