import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGatway from "../../gateway/client.gateway";
import { AddClienteOutputDto, AddClientInputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {
    private _clientRepository: ClientGatway;
    constructor(clientRepository: ClientGatway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: AddClientInputDto): Promise<AddClienteOutputDto> {
        const props = {    
            id: new Id(input.id) || new Id(),        
            name: input.name,
            email: input.email,
            address: input.address,
        };

        const client = new Client(props);
        this._clientRepository.add(client);

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