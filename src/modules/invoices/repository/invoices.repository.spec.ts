import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/InvoiceItems.entity";
import Invoice from "../domain/invoices.entity";
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
        },{
            include: [{model: invoiceItemsModel}]
        });

        const findinvoide = await InvoiceModel.findOne({
            where: {id: invoce.id},
            include: ["items"],
        })

        const invoice = await invoiceRepository.find("1");

        expect(invoice.id.id).toEqual(findinvoide.id);   
        expect(invoice.name).toEqual(findinvoide.name);   
        expect(invoice.document).toEqual(findinvoide.document);   
        expect(invoice.address.city).toEqual(findinvoide.city);   
        expect(invoice.address.street).toEqual(findinvoide.street);   
        expect(invoice.address.complement).toEqual(findinvoide.complement);   
        expect(invoice.address.number).toEqual(findinvoide.number);   
        expect(invoice.address.state).toEqual(findinvoide.state);   
        expect(invoice.address.zipCode).toEqual(findinvoide.zipCode);          
        expect(invoice.items[0].id.id).toEqual(findinvoide.items[0].id);
        expect(invoice.items[0].name).toEqual(findinvoide.items[0].name);
        expect(invoice.items[0].quantity).toEqual(findinvoide.items[0].quantity);
        expect(invoice.items[0].price).toEqual(findinvoide.items[0].price);

    });
    it("should generate a invoice", async() => {
        const invoiceRepository = new InvoiceRepository();

        
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Procuect 1", 
            document: 'Document 1',
            address: new Address({               
                number: '123',  
                street: 'street 1',
                complement: "Complement 1",
                city: "City 1", 
                state: "State 1", 
                zipcode: "Zip Code 7477895",
            }), 
            items: [new InvoiceItems({
               id: new Id("1"),
               name: "Product 1",
               quantity: 1,
               price:  12.6,
            })],

        });

        const findinvoide = await invoiceRepository.generate(invoice);
  
        expect(invoice.id.id).toEqual(findinvoide.id.id);   
        expect(invoice.name).toEqual(findinvoide.name);   
        expect(invoice.document).toEqual(findinvoide.document);   
        expect(invoice.address.city).toEqual(findinvoide.address.city);   
        expect(invoice.address.street).toEqual(findinvoide.address.street);   
        expect(invoice.address.complement).toEqual(findinvoide.address.complement);   
        expect(invoice.address.number).toEqual(findinvoide.address.number);   
        expect(invoice.address.state).toEqual(findinvoide.address.state);   
        expect(invoice.address.zipCode).toEqual(findinvoide.address.zipCode);          
        expect(invoice.items[0].id.id).toEqual(findinvoide.items[0].id.id);
        expect(invoice.items[0].name).toEqual(findinvoide.items[0].name);
        expect(invoice.items[0].quantity).toEqual(findinvoide.items[0].quantity);
        expect(invoice.items[0].price).toEqual(findinvoide.items[0].price);
    });
})