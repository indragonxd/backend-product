import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import {Model} from 'mongoose';
import { CreateProductDto } from './dto/products.dto';
@Injectable()
export class ProductService {

    //el injectModel es la conexion directa con mongodb
    constructor(@InjectModel('Product') private productModel : Model<Product>){}

    async getProducts():Promise<Product[]>{
        //retorna una promesa y sale bien un vector de productos
        return await this.productModel.find();
    }

    async getProduct(id : number):Promise<Product>{
        return await this.productModel.findById(id);
    }

    async createProduct(productDto : CreateProductDto):Promise<Product>{
        const newProduct = new this.productModel(productDto);
        return await newProduct.save();
    }

    async deleteProduct(productId : number):Promise<Product>{
        return await this.productModel.findByIdAndDelete(productId);
    }

    async updateProduct(productId : number , productDto:CreateProductDto):Promise<Product>{
                                                                            //para que regrese el objeto actualizado
        return await this.productModel.findByIdAndUpdate(productId,productDto,{new:true});
    }
}
