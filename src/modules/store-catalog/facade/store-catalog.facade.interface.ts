export interface FindStoreCatalogFacedeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOutput {
    id: string;
    name: string;
    description: string;
    salesPrice: number;

}

export interface FindAllStoreCatalogFacadeOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}


export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacedeInputDto) : Promise<FindStoreCatalogFacadeOutput>;
    findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}

