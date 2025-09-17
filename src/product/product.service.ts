import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';
import { ShopEntity } from '../shop/shop.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>
    ) {}

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find()
    }

    async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const shop = await this.shopRepository.findOne({ where: { id: createProductDto.shopId } })
        if (!shop) throw new NotFoundException('Shop not found')

        const product = new ProductEntity()
        Object.assign(product, createProductDto)
        
        return await this.productRepository.save(product)
    }

    async deleteProduct(productId: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne({ where: { id: productId } })
        if (!product) throw new NotFoundException('Product not found')

        return await this.productRepository.remove(product)
    }
}
