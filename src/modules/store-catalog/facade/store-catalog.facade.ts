import FindAllProducsUseCase from "../usecase/find-all-products/find-all.products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeOutput, FindStoreCatalogFacedeInputDto } from "./store-catalog.facade.interface";


export interface UseCaseProps {
    findUseCase: FindProductUseCase;
    findAllUseCase: FindAllProducsUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUseCase : FindProductUseCase;
    private _findAllUseCase: FindAllProducsUseCase;
    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._findAllUseCase = props.findAllUseCase;

    }
    async find(id: FindStoreCatalogFacedeInputDto): Promise<FindStoreCatalogFacadeOutput> {
        return await this._findUseCase.execute(id);
    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
       return await this._findAllUseCase.execute();
    }

}