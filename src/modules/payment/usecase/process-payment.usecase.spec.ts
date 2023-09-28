import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction"
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    }
}

describe("Test unit processPayment ", () =>{
  
  it("should a create payment", async()=>{
    const paymentRepository = MockRepository();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
        orderId: "1",
        amount: 100,
    }

     const result  = await useCase.execute(input);

     expect(paymentRepository.save).toHaveBeenCalled();
     expect(result.transactionId).toBe(transaction.id.id);
     expect(result.status).toBe("approved");
     expect(result.amount).toBe(100);
     expect(result.orderId).toBe("1");
     expect(result.updatedAt).toBe(transaction.updatedAt);
     expect(result.createdAt).toBe(transaction.createdAt);

  });


})