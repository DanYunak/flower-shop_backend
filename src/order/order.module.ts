import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from '../order-item/order-item.entity';
import { ProductEntity } from '../product/product.entity';
import { CartEntity } from '../cart/cart.entity';
import { CartItemEntity } from '../cart-item/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, ProductEntity, CartEntity, CartItemEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
