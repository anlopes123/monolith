import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import Transaction from "../domain/transaction";
import PaymentGetway from "../gateway/payment.gatway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {

    constructor(private transactionRepository: PaymentGetway) {

    }
    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const  transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId,  
        });

        transaction.process();

        const persistTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: transaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,

        }
    }

}