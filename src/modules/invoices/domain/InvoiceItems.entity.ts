import AggregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"

type InvoiceItemsPros = {
    id?: Id;
    name: string;
    quantity: number;
    price: number;
}

export default class InvoiceItems extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;
    private _quantity: number;
    constructor(props: InvoiceItemsPros) {
        super(props.id);
        this._name = props.name;
        this._quantity = props.quantity;
        this._price = props.price        
    }

    get name(): string {
        return this._name;        
    }

    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price;
    }

    totalItems(): number {
        return this._quantity*this._price;
    }
}