export interface ProcessPaymentInputDto {
    oderId: string;
    amount: number;
}

export interface ProcessPaymentOutputDto {
    transactionId: string;
    orderId: string;
    status: string;    
    amount: number;    
    createdAt: Date;
    updatedAt: Date;
    
}
