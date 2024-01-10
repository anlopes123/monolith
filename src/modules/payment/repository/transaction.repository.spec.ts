import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import TransactionModel from "./transaction.model";
import TransactionReporisoty from "./transaction.repository";

describe("TransactionRepository test", () =>{
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize ({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([TransactionModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should save a transaction", async() => {
        const transaction = new Transaction({
            id : new Id("1"),
            amount: 100,
            orderId: "1",
        });

        transaction.aprove();
        const repository = new TransactionReporisoty();
        const result = await repository.save(transaction);

        expect(result.id.id).toBe(transaction.id.id);
        expect(result.amount).toBe(transaction.amount);
        expect(result.status).toBe("approved");
        expect(result.orderId).toBe(transaction.orderId)


    });

});