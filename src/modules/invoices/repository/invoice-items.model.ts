import { AllowNull, Column, ForeignKey, Model ,
         PrimaryKey,
         Table 
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice_items",
    timestamps: false,
})
export default class invoiceItemsModel extends Model{
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;       

    @ForeignKey(()=> InvoiceModel)
    @Column({allowNull: false})
    declare invoice_id: string;
    
    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;

}