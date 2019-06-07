import { Controller, Get, Param, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/products.dto';
import { InjectModel } from '@nestjs/mongoose';

@Controller('product')
export class ProductController {

    constructor( ){}

    @Get()
    getProducts(){}

    @Get(':id')
    getProduct(@Param('id') id : number){}

    @Post('/create')
    createProduct(@Res() res ,@Body() productDto:CreateProductDto ){

        res.status(HttpStatus.OK).json({
            mensaje : 'recibido'
        })
    }

}
