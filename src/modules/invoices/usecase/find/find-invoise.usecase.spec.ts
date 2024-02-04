import Id from "../../../@shared/domain/value-object/id.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

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
    };
};

describe("Find invoice usecase", () =>{

    it("find a invoice unit test ", async()=>{

        const invoiceRepository = MockRepository();
        const findInvoiceUsecase = new FindInvoiceUseCase(invoiceRepository);
        const input = {
            id: "1",
        }

        const output = await findInvoiceUsecase.execute(input);

        expect(output).toBeDefined();
        expect(output.name).toBe("Invoice 1");
        expect(output.document).toBe("123456");
        expect(output.address.street).toBe("rua x");
        expect(output.address.number).toBe("1");
        expect(output.address.complement).toBe("próximo ao hospital");
        expect(output.address.city).toBe("Aparecida de Goiânia");        
        expect(output.address.state).toBe("Goiás");
        expect(output.address.zipCode).toBe("74000-000");
        expect(output.items[0].id).toBe("1");
        expect(output.items[0].name).toBe("Invoice Items 1");
        expect(output.items[0].quantity).toBe(1);
        expect(output.items[0].price).toBe(150);
        expect(output.total).toBe(150);
        
    })
})