import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from '../order-item/order-item.entity';
import { ProductEntity } from '../product/product.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CartEntity } from '../cart/cart.entity';
import { CartItemEntity } from '../cart-item/cart-item.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,

        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,

        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,

        @InjectRepository(CartItemEntity)
        private readonly cartItemRepository: Repository<CartItemEntity>
    ) { }

    async createOrder(userId: number, createOrderDto: CreateOrderDto): Promise<OrderEntity> {
        const cart = await this.cartRepository.findOne({
            where: { userId },
            relations: ['items', 'items.product']
        })

        if (!cart || cart.items.length === 0) throw new HttpException('Cart is empty', HttpStatus.BAD_REQUEST)

        let totalPrice = 0
        const items: OrderItemEntity[] = []

        for (const cartItem of cart.items) {
            const orderItem = new OrderItemEntity()
            orderItem.product = cartItem.product
            orderItem.quantity = cartItem.quantity
            orderItem.price = cartItem.product.price

            totalPrice += cartItem.quantity * cartItem.product.price

            items.push(orderItem)
        }

        const order = new OrderEntity()
        order.userEmail = createOrderDto.userEmail;
        order.userPhone = createOrderDto.userPhone;
        order.deliveryAddress = createOrderDto.deliveryAddress;
        order.totalPrice = totalPrice;
        order.items = items;

        await this.orderRepository.save(order)

        await this.cartItemRepository.remove(cart.items)

        return order
    }

    async getAllOrders(): Promise<OrderEntity[]> {
        return this.orderRepository.find({ relations: ['items', 'items.product'] })
    }

    async getOrderById(id: number): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({
            where: {id},
            relations: ['items', 'items.product']
        })

        if (!order) throw new HttpException('Order not found', HttpStatus.NOT_FOUND)

        return order
    }
}