import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("Cliente Repository test", ()=>{
    let sequelize: Sequelize;

    beforeEach(async () =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage:":memory:",
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();  
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should a find client ", async()=>{
        const client = await ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

     
        const repository = new ClientRepository();
       
        const result = await repository.find(client.id);
        
        expect(result.id.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
        

    });
});