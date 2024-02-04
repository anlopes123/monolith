const invoice = {
    id: new Id("1"),
    name: "Invoice 1",
    document: "123456",
    address: {
      street: "rua x",
      number: "1",
      complement: "próximo ao hospital",
      city: "Aparecida de Goiânia",
      state: "Goiás",
      zipCode: "74000-000",
    },
    items:[ {
      id: new Id("1"),
      name: "Invoice Items 1",
      quantity: 1,
      price: 150,
    }],
    total: 150,    
};

const MockRepository = () =>{
    return {      
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn();
    };
};

describe("Teste GenerateUseCase unit", ()=>{
    it("Shoud a generate invoice", async()=>{
        const invoiceRepository = MockRepository();
        const useCase = new GenerateInvoiceUseCase(invoiceRepository);

        const input = {
            name: "invoice 1",
            document: "123456",
            street: "rua x",
            number: "string",
            complement: "próximo ao hospital",
            city: "Aparecida de Goiânia",
            state: "Goiás",
            zipCode: "74000-000",
            items: {
              id: "1",
              name: "Invoice Item 1",
              quantity: 1,
              price: 150,
            },
        };

        const output = await useCase.execute(input);

        expect(output).toBeDefined();
 
    })
})