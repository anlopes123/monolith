import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ProductGatway from "../../gateway/product.gateway";

export default class FindAllProducsUseCase implements UseCaseInterface{

    constructor(private productRepository: ProductGatway) {};

    async execute(): Promise<any> {
        const productsResult = await this.productRepository.findAll();     

        return {
           products:  productsResult.map((product) => ({
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,   
            })),        
        };
    }


}