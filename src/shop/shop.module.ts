import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopEntity } from './shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity])],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
