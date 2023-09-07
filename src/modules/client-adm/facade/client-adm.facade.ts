import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./cliente-adm.facade.interface";

type UseCaseProps = {
    findUseCase: UseCaseInterface;
    addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _findUseCase: UseCaseInterface;
    private _addUseCase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._addUseCase = usecaseProps.addUseCase;
        this._findUseCase = usecaseProps.findUseCase;
    }
    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUseCase.execute(input);
    }
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        throw new Error("Method not implemented.");
    }

}