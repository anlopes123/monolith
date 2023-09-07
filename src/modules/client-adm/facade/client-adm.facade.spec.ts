import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-cliente.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("ClientAdmFacede test", ()=>{
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async()=> {
        await sequelize.close();
    });

    it("should create a client", async()=>{
        const repository = new ClientRepository();
        const addUseCase = new AddClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUseCase: addUseCase,
            findUseCase: undefined,
        });
        const input = {
            id: "1",
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",
        };
        await facade.add(input);

        const clientDb = await ClientModel.findOne({where: {id: "1"}});
        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(input.id);
        expect(clientDb.name).toBe(input.name);
        expect(clientDb.email).toBe(input.email);
        expect(clientDb.address).toBe(input.address);
    })
})