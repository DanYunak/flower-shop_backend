import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from './shop.entity';
import { CreateShopDto } from './dto/createShopDto';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>
    ) {}

    async findAll(): Promise<ShopEntity[]> {
        return await this.shopRepository.find()
    }

    async createShop(createShopDto: CreateShopDto): Promise<ShopEntity> {
        const shop = new ShopEntity()
        Object.assign(shop, createShopDto)
        
        return await this.shopRepository.save(shop)
    }
}
