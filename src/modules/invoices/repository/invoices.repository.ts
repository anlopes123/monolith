import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/InvoiceItems.entity";
import Invoice from "../domain/invoices.entity";
import InvoiceGateway from "../gateway/invoice.gatway";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
   async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: {id: id}, 
            include: ["items"],
        });
        let invoiceItems : Array<InvoiceItems> = [];
        invoiceModel.items.forEach((item)=> {
             const ivt = new InvoiceItems({
                     id: item.id, 
                     name: item.name, 
                     quantity: item.quantity, 
                     price: item.price
                 });
             invoiceItems.push(ivt);   
        });        
        return  new Invoice({
            id: new Id(invoiceModel.id), 
            name: invoiceModel.name,
            address: {
                street: invoiceModel.street,
                number: invoiceModel.number,
                complement: invoiceModel.complement,
                city: invoiceModel.city, 
                state: invoiceModel.state, 
                zipCode: invoiceModel.zipCode,
            }, 
            document: invoiceModel.document, 
            items: invoiceItems,            
        })
            
    }
    async generate(invoice: Invoice): Promise<Invoice>{
        return undefined;
    } ;
}