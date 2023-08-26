import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductRepository from "../repository/product.repository";
import FindAllProducsUseCase from "../usecase/find-all-products/find-all.products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFactory {
    static create(): StoreCatalogFacade {
        const productRepository = new ProductRepository();
        const findUseCase = new FindProductUseCase(productRepository);
        const findAllUseCase = new FindAllProducsUseCase(productRepository);

        const facade = new StoreCatalogFacade({
            findUseCase: findUseCase,
            findAllUseCase: findAllUseCase,
        });
        return facade;
    }
}