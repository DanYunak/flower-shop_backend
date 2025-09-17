import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';
import { CartItemEntity } from '../cart-item/cart-item.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        @InjectRepository(CartItemEntity)
        private readonly cartItemRepository: Repository<CartItemEntity>,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async getCart(userId: number): Promise<CartEntity> {
        let cart = await this.cartRepository.findOne({
            where: { userId },
            relations: ['items', 'items.product']
        })

        if (!cart) {
            cart = this.cartRepository.create({ userId, items: [] })
            await this.cartRepository.save(cart)
        }

        return cart
    }

    async addItem(userId: number, productId: number, quantity: number): Promise<CartEntity> {
        const cart = await this.getCart(userId)
        const product = await this.productRepository.findOne({ where: { id: productId } })
        if (!product) throw new NotFoundException('Product not found')

        let item = cart.items.find(i => i.productId === product.id)
        if (item) {
            item.quantity += quantity
        } else {
            item = this.cartItemRepository.create({ product, productId, quantity, cart })
            cart.items.push(item)
        }

        await this.cartRepository.save(cart)
        return this.getCart(userId)
    }

    async removeItem(userId: number, productId: number): Promise<CartEntity> {
        const cart = await this.getCart(userId)
        const item = cart.items.find(i => i.productId === productId)

        if (!item) throw new NotFoundException('Item not found in cart')

        await this.cartItemRepository.remove(item)

        return this.getCart(userId)
    }

    async updateItem(userId: number, productId: number, quantity: number): Promise<CartEntity> {
        const cart = await this.getCart(userId)
        const item = cart.items.find(i => i.productId === productId)

        if (!item) throw new NotFoundException('Item not found in cart')

        item.quantity = quantity

        await this.cartRepository.save(cart)
        return this.getCart(userId)
    }
}
