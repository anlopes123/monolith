import Id from "../value-object/id.value-object";

export default class BaseEntity{
    private _id: Id;
    private _createdAt: Date;
    private _updateAt: Date;

    constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
        this._id = id || new Id();
        this._createdAt = createdAt || new Date();
        this._updateAt = updatedAt || new Date();
    }
    get id() : Id {
        return this._id;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updateAt;
    }

    set updatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }
}