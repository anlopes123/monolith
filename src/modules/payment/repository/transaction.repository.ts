import Transaction from "../domain/transaction";
import PaymentGetway from "../gateway/payment.gatway"
import TransactionModel from "./transaction.model";
export default class TransactionReporisoty implements PaymentGetway {
   async save(input: Transaction): Promise<Transaction> {
      await TransactionModel.create( {
        id: input.id.id,
        orderId: input.orderId,
        amount: input.amount,
        status: input.status,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt
      });

      return new Transaction({
        id: input.id,
        orderId: input.orderId,
        amount: input.amount,
        status: input.status,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
      })

   }

}