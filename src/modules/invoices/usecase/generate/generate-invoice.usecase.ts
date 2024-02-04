import InvoiceGateway from "../../gateway/invoice.gatway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate.invoice.dto";

export default class GenerateInvoiceUseCase {
    constructor(private readonly invoiceRepository: InvoiceGateway){}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        
    }
}