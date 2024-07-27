import { Sequelize } from "sequelize-typescript";
import invoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoices.repository";

describe("Invoides Test Case", ()=> {
    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize ({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([InvoiceModel, invoiceItemsModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
  
    it("Should find a invoice", async() =>{
        const invoiceRepository = new InvoiceRepository();

        const invoce =  await InvoiceModel.create({
            id: "1",
            name: "invoice 1",
            document: "Document 1",
            number: "123",
            street: "Rua 123",
            complement: "Complemento",
            city: "City",
            state: "State",
            zipCode: "zipCode", 
            items: [{
                id: "1", 
                name: "invoice-item 1",
                quantity: 1,
                price: 12.50,
            }],           


        });

        const findinvoide = await InvoiceModel.findOne({
            where: {id: invoce.id},
            include: ["items"],
        })

        const findInvoiceRepository = await invoiceRepository.find("1");

        expect(findInvoiceRepository.id.id).toEqual(findinvoide.id);   
        expect(findInvoiceRepository.name).toEqual(findinvoide.name);   
        expect(findInvoiceRepository.document).toEqual(findinvoide.document);   
        expect(findInvoiceRepository.address.city).toEqual(findinvoide.city);   
        expect(findInvoiceRepository.address.street).toEqual(findinvoide.street);   
        expect(findInvoiceRepository.address.complement).toEqual(findinvoide.complement);   
        expect(findInvoiceRepository.address.number).toEqual(findinvoide.number);   
        expect(findInvoiceRepository.address.state).toEqual(findinvoide.state);   
        expect(findInvoiceRepository.address.zipCode).toEqual(findinvoide.zipCode);   
        
        



    })
})