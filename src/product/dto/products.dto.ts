

export class CreateProductDto{
   readonly name : string;
   readonly description :string;
   readonly imageURL:string;
   readonly price:number;
   readonly createdAt = {
       type : Date,
       default : Date.now
   };
}