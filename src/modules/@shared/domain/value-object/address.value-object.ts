import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
   private  _number: string;
   private  _street: string;
   private  _complement: string;
   private  _city: string;
   private _state: string;
   private _zipCode: string;
    
}