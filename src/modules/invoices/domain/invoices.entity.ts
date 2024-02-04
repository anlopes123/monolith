import { ArrayDataType } from "sequelize";
import AggregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./InvoiceItems.entity";


type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    createdAt?: Date;
    updatedAt?: Date;
}


export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;    
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];
    
    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);        
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
        
    } 

    validate(): boolean {
        if(this._id.id.length === 0) {
            throw new Error("Id is required");
        }
      
        if(this._items.length === 0) {
            throw new Error("Items qte must be greater than 0");
        }
        if(this._items.some(item=>item.quantity <=0)) {
            throw new Error("Quantity must be greater than 0");
        }
        if(this.document.length === 0) {
            throw new Error("Document is requered")
        }
        return true;
    }


    get name() : string {
        return this._name;
    }

    get document(): string{
        return this._document;
    }

    get address(): Address {
        return this._address;
    }
    get items(): InvoiceItems[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((acc, item)=> acc+item.totalItems(), 0);
    }

}