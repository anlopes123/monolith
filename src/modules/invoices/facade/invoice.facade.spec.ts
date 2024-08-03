import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facede.factory";
import invoiceItemsModel from "../repository/invoice-items.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacade from "./invoice.facade";

describe("InvoiceFacade TestCase", () => {
    let sequelize: Sequelize;
    beforeEach(async () =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage:":memory:",
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([InvoiceModel, invoiceItemsModel]);
        await sequelize.sync();  
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("Should find invoice facade", async()=>{

        const invoce =  await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document 1",
            number: "123",
            street: "Rua 123",
            complement: "Complemento",
            city: "City",
            state: "State",
            zipCode: "zipCode", 
            items: [{
                id: "1", 
                name: "Invoice Items 1",
                quantity: 1,
                price: 12.50,
            }], 
            total: 12.50,        
        },{
            include: [{model: invoiceItemsModel}]
        });

        const findInvoicefacee = InvoiceFacadeFactory.create();
        const input = {
            id: "1",
        }

        const output = await findInvoicefacee.find(input);

        expect(output).toBeDefined();
        expect(output.name).toBe("Invoice 1");
        expect(output.document).toBe("Document 1");
        expect(output.address.street).toBe("Rua 123");
        expect(output.address.number).toBe("123");
        expect(output.address.complement).toBe("Complemento");
        expect(output.address.city).toBe("City");        
        expect(output.address.state).toBe("State");
        expect(output.address.zipCode).toBe("zipCode");
        expect(output.items[0].id).toBe("1");
        expect(output.items[0].name).toBe("Invoice Items 1");
        expect(output.items[0].quantity).toBe(1);
        expect(output.items[0].price).toBe(12.50);
    })

    it("Should generate invoice", async()=>{

        const input = {
            id: "1",
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
        const invoiceFacade = InvoiceFacadeFactory.create();

        const output = await invoiceFacade.generate(input);
        
        expect(output).toBeDefined();
        expect(output.name).toBe("invoice 1");
        expect(output.document).toBe("123456");
        expect(output.street).toBe("rua x");
        expect(output.number).toBe("456");
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