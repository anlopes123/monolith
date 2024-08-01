

export interface FindInvoiceFacadeInputDto {
    id: string;

}

export interface FindInvoiceFacadeOutPutDTO {
    id: string;
    name: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
    items: {
      id: string;
      name: string;
      quantity: number,
      price: number,
    }[];
    total: number;
    createdAt: Date;
  }


export interface GenerateInvoiceFacadeInputDto {
    id?: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      quantity: number;
      price: number;
    }[];

}


export interface GenerateInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      quantity: number;
      price: number;
    }[];
    total: number;
}

export default interface InvoiceFacadeInterface {
    generate(generate: GenerateInvoiceFacadeInputDto) : Promise<GenerateInvoiceFacadeOutputDto>;
    find(findInput: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutPutDTO>;

}