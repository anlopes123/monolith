import InvoiceGateway from "../../gateway/invoice.gatway";
import { FindInvoiceUseCaseOutPutDTO, FindInvoiceUseCaseInputDTO } from "./find-invoice.usecase.dto";



export default class FindInvoiceUseCase {
    constructor(private readonly invoiceRepositoy: InvoiceGateway){}

    async execute(input: FindInvoiceUseCaseInputDTO) : Promise<FindInvoiceUseCaseOutPutDTO> {
        const invoice = await this.invoiceRepositoy.find(input.id);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items : [{
                id: invoice.items[0].id.id,
                name: invoice.items[0].name,
                quantity: invoice.items[0].quantity,
                price: invoice.items[0].price,
            }],
            createdAt: invoice.createdAt,
            total: invoice.total,
        }

    }
    
};