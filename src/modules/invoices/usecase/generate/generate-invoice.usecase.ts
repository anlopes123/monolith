import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../domain/InvoiceItems.entity";
import Invoice from "../../domain/invoices.entity";
import InvoiceGateway from "../../gateway/invoice.gatway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.invoice.dto";

export default class GenerateInvoiceUseCase {
    constructor(private readonly invoiceRepository: InvoiceGateway){}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        
        const invoice = new Invoice({ 
           id: new Id(input.id),            
           name : input.name,
           address: new Address( {
                number: input.number,
                street: input.street,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipcode: input.zipCode,
            }),
            document: input.document,
            items: input.items.map((item)=>(new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })))

        });

        const output = await this.invoiceRepository.generate(invoice);

        return {
            id:  output.id.id,
            name: output.name,
            document: output.document,
            number: output.address.number,
            street: output.address.street,
            complement: output.address.complement,
            city: output.address.city,
            state: output.address.state,
            zipCode: output.address.zipCode,
            items: output.items.map((item)=>({
                id: item.id.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            total: output.total

        }
    }
}