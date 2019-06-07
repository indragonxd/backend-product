
//objeto que se maneja para lado del cliente
export class CreateProductDto{
   readonly name : string;
   readonly description :string;
   readonly imageURL:string;
   readonly price:number;
   readonly createdAt : Date;
}