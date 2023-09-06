import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGatway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";


export default class FindClientUseCase {
    private _clientRepository: ClientGatway;
    constructor(clientRepository: ClientGatway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        
        const client = await this._clientRepository.find(input.id);
        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}