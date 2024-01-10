import PaymentFacadeInterface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import TransactionReporisoty from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment.usecase";

export default class PaymentFacadeFactory {
    static create() : PaymentFacadeInterface {
        const repository = new TransactionReporisoty();
        const useCase = new ProcessPaymentUseCase(repository);
        return new PaymentFacade(useCase);
    }
}