import Invoice from "../domain/invoices.entity";

export default interface InvoiceGateway {
    find(id: string): Promise<Invoice>
    generate(invoice: Invoice): Promise<Invoice>;
}