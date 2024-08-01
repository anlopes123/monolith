import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoices.repository";
import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository();
        const findInvoicetUseCase = new FindInvoiceUseCase(invoiceRepository);
        const generateInoviceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
        const invoiceFacade = new InvoiceFacade({
            findUseCase: findInvoicetUseCase,
            generateUseCase: generateInoviceUseCase,
        });

        return invoiceFacade;
    };

}