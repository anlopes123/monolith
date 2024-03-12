import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoices.entity";
import InvoiceGateway from "../../gateway/invoice.gatway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.invoice.dto";

export default class GenerateInvoiceUseCase {
    constructor(private readonly invoiceRepository: InvoiceGateway){}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        
        const invoice = new Invoice({ 
           id: new Id(input.id),            
           name : input.name,
           address: {
                number: input.number,
                street: input.street,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            document: input.document,
            items: input.items.map((item)=>({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))

        });

        const output = await this.invoiceRepository.generate(invoice);

        return {
            id:  output.id,
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