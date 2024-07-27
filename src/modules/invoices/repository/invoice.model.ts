import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import invoiceItemsModel from "./invoice-items.model";

@Table({
    tableName: "invoice",
    timestamps: false
})
export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
    @Column
    declare name: string;
    @Column
    declare  document: string;
    @Column
    declare number: string;
    @Column
    declare street: string;
    @Column
    declare complement: string;
    @Column
    declare city: string;
    @Column
    declare state: string;
    @Column
    declare zipCode: string;

    @HasMany(() => invoiceItemsModel)
    declare items: invoiceItemsModel[];
    
}