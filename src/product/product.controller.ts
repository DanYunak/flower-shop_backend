import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProductDto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(): Promise<ProductEntity[]> {
        return await this.productService.findAll()
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
        return await this.productService.createProduct(createProductDto)
    }

    @Delete(':productId')
    async deleteProduct(@Param('productId') productId: number): Promise<ProductEntity> {
        return await this.productService.deleteProduct(productId)
    }
}
