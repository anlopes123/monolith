import Transaction from "../domain/transaction"

export default interface PaymentGetway {
    save(input: Transaction) : Promise<Transaction>;
}