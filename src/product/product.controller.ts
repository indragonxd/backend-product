import { Controller, Get, Param, Post, Body, Res, HttpStatus, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/products.dto';
import { ProductService } from './product.service';
import { json } from 'body-parser';

@Controller('product')
export class ProductController {
    /*
    modo largo ---> mediante injecciones instancia el productService
    private productService:ProductService
    constructor(productService:ProductService){
        this.productService = productService;
    }
    */
    constructor(private productService:ProductService){}

    @Get('/')
    async getProducts(@Res() res){
        const productos = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            mensage : 'envio de productos',
            value : productos
        });
        
    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') id : number){
        const product = await this.productService.getProduct(id);
        if(!product) throw new NotFoundException('El id no existe');
        res.status(HttpStatus.OK).json({
            mensage : 'envio producto',
            value : product
        });
    }

    @Post('/create')
    //@Res() con este decorador se le puede responder al cliente
    async createProduct(@Res() res ,@Body() productDto:CreateProductDto ){
        const newProduct = await this.productService.createProduct(productDto);
        res.status(HttpStatus.OK).json({
            mensaje : 'Producto creado',
            value : newProduct
        })
    }
    //se pudo hacer /delete/:id
    //la peticion ahora es ../delete?productID=1
    @Delete('/delete')
    deleteProduct(@Res() res , @Query('productID') id :number){
        const product = this.productService.deleteProduct(id);
        if(!product) throw new NotFoundException('El id no existe');
        res.status(HttpStatus.OK).json({
            mensage : 'se elimino',
            value : product
        });
    }
    @Put('/update')
    updateProduct(@Res() res ,@Body() productDto:CreateProductDto , @Query('productID') id :number){
        const updtProduct = this.productService.updateProduct(id,productDto);
        if(!updtProduct)throw new NotFoundException('No se encontro el id');
        res.status(HttpStatus.OK).json({
            mensage : 'se actualizo el producto',
            value : updtProduct
        });
    }
}
