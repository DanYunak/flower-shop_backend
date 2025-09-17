import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartEntity } from './cart.entity';
import { CartItemEntity } from '../cart-item/cart-item.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, CartItemEntity, ProductEntity, UserEntity])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
