export interface PaymentFacadeInputDto {
    orderId: string;
    amount: number;
}

export interface PaymentfacadeOutputDto {
    transactionId: string;
    orderId: string;
    status: string;    
    amount: number;    
    createdAt: Date;
    updatedAt: Date;
    
}


export default interface PaymentFacadeInterface {
    process(input: PaymentFacadeInputDto): Promise<PaymentfacadeOutputDto>;
}