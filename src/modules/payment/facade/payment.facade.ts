import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentfacadeOutputDto } from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {

    constructor(private processPaymentUseCase: UseCaseInterface) {

    }
    process(input: PaymentFacadeInputDto): Promise<PaymentfacadeOutputDto> {
        return this.processPaymentUseCase.execute(input);
    }
    
}