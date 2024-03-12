import { Column, Model ,
         PrimaryKey,
         Table 
} from "sequelize-typescript";

@Table({
    tableName: "invoice_items",
    timestamps: false,
})
export default class invoiceItemsModel extends Model{
    @PrimaryKey
    @Column
    declare id: string;       
    
    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;

}