import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/InvoiceItems.entity";
import Invoice from "../domain/invoices.entity";
import InvoiceGateway from "../gateway/invoice.gatway";
import invoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
   async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: {id: id}, 
            include: invoiceItemsModel,
        });        
        
        return  new Invoice({
            id: new Id(invoiceModel.id), 
            name: invoiceModel.name,
            address: new Address( {
                street: invoiceModel.street,
                number: invoiceModel.number,
                complement: invoiceModel.complement,
                city: invoiceModel.city, 
                state: invoiceModel.state, 
                zipcode: invoiceModel.zipCode,
            }), 
            document: invoiceModel.document, 
            items: invoiceModel.items.map((item)=>(new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,               
                quantity: item.quantity,
              }))),
        })
            
    }
    async generate(invoice: Invoice): Promise<Invoice>{
       const invoiceModeOutPut = await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            number: invoice.address.number,
            street: invoice.address.street,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode, 
            items:  invoice.items.map((item)=>({
                id: item.id.id,
                name: item.name,
                price: item.price,               
                quantity: item.quantity,
              })),
        },{
            include: [{model: invoiceItemsModel}]
        });

        return new Invoice({
            id: new Id(invoiceModeOutPut.id),
            name: invoiceModeOutPut.name,
            document: invoiceModeOutPut.document,
            address: new Address( {
                street: invoiceModeOutPut.street,
                number: invoiceModeOutPut.number,
                complement: invoiceModeOutPut.complement,
                city: invoiceModeOutPut.city, 
                state: invoiceModeOutPut.state,
                zipcode: invoiceModeOutPut.zipCode
            }),
            items: invoiceModeOutPut.items.map((item) =>(new InvoiceItems({
                id : new Id(item.id),
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            }))),
        })
    } ;


}