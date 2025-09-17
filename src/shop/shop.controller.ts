import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopEntity } from './shop.entity';
import { CreateShopDto } from './dto/createShopDto';

@Controller('shops')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Get()
    async findAll(): Promise<ShopEntity[]> {
        return await this.shopService.findAll()
    }

    @Post()
    async createShop(@Body() createShopDto: CreateShopDto): Promise<ShopEntity> {
        return await this.shopService.createShop(createShopDto)
    }
}
