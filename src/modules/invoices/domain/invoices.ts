import AggregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./InvoiceItems";


type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoices extends BaseEntity implements AggregateRoot {
    private _name: string;    
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];
    
        constructor(props: InvoiceProps) {
            super(props.id);

        } 

}