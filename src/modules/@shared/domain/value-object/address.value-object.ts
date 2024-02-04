import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
   private _number: string;
   private _street: string;
   private _complement: string;
   private _city: string;
   private _state: string;
   private _zipCode: string;

   
   get street(): string {
      return this._street;
   } 
   get number(): string {
      return this._number;
   } 
   get complement(): string {
      return this._complement;
   } 
   get city(): string {
      return this._city;
   } 
   get state(): string {
      return this._state;
   } 
   get zipCode(): string {
      return this._zipCode;
   } 
}