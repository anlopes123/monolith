import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Descritpion 1",
    salesPrice: 100,
});

const MockRepository = () =>{
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("find a product usecase unit test", () => {

    it("Should find a product", async()=>{
        const productRepository = MockRepository();

        const findUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        }

        const output = await findUseCase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(output.id).toBe("1");
        expect(output.name).toBe("Product 1");
        expect(output.description).toBe("Descritpion 1");
        expect(output.salesPrice).toBe(100);

    })
});