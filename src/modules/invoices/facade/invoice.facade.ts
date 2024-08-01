import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutPutDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";


export interface InvoiceProps {
    findUseCase: FindInvoiceUseCase;
    generateUseCase: GenerateInvoiceUseCase;
}

export default class InvoiceFacade  implements InvoiceFacadeInterface{

   private _find : FindInvoiceUseCase;
   private _generate: GenerateInvoiceUseCase;

   constructor(usecaseProps: InvoiceProps) {
         this._find = usecaseProps.findUseCase;
         this._generate = usecaseProps.generateUseCase;
   }

    find(findInput: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutPutDTO> {
        
        return this._find.execute(findInput);
    }
    generate(generate: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
      return  this._generate.execute(generate);
    }
}