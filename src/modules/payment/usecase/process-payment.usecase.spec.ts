import Transaction from "../domain/transaction"
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 99,
    orderId: "1",
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction));
    }
}

describe("Test unit processPayment ", () =>{
  it("should a create payment", async()=>{
    const paymentRepository = MockRepository();
    const useCase = new ProcessPaymentUseCase(paymentRepository);

    input = {
        orderId: "1",
        amount: 100,
    }

    const result  =
  });


})