import Id from "../../../@shared/domain/value-object/id.value-object";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
}

describe("Teste GenerateUseCase unit", ()=> {

    it("Shoud a generate invoice", async()=>{
        const invoiceRepository = MockRepository()
        const useCase = new GenerateInvoiceUseCase(invoiceRepository);

        const input = {
            name: "invoice 1",
            document: "123456",
            street: "rua x",
            number: "456",
            complement: "próximo ao hospital",
            city: "Aparecida de Goiânia",
            state: "Goiás",
            zipCode: "74000-000",
            items:[ {
              id: "1",
              name: "Invoice Items 1",
              quantity: 1,
              price: 150,
            }],
        };

        const output = await useCase.execute(input);

        expect(output).toBeDefined();
        expect(output.name).toBe("Invoice 1");
        expect(output.document).toBe("123456");
        expect(output.street).toBe("rua x");
        expect(output.number).toBe("1");
        expect(output.complement).toBe("próximo ao hospital");
        expect(output.city).toBe("Aparecida de Goiânia");
        expect(output.state).toBe("Goiás");
        expect(output.zipCode).toBe("74000-000");
        expect(output.items[0].id).toBe("1");
        expect(output.items[0].name).toBe("Invoice Items 1");
        expect(output.items[0].quantity).toBe(1);
        expect(output.items[0].price).toBe(150);
        expect(output.total).toBe(150);
        
 
    })
})