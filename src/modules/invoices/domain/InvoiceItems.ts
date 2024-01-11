import AggregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"

type InvoiceItemsPros = {
    id?: Id;
    name: string;
    price: number;
}

export default class InvoiceItems extends BaseEntity implements AggregateRoot {

    constructor(props: InvoiceItemsPros) {
        
    }
}