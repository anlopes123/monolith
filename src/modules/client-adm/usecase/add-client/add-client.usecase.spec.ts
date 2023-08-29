import AddClientUseCase from "./add-cliente.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),    
    };
};


describe("Add Client UseCase unit Test", ()=> {

    it("Should add a client", async() => {
        const repository = MockRepository();
        const useCase = new AddClientUseCase(repository);

        const input = {
            name: "Client 1",
            email: "x@x.com",
            address: "Address 1",

        };
        const result = await useCase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();


    });
})