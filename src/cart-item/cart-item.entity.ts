import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from '../cart/cart.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'cart_items' })
export class CartItemEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => CartEntity, cart => cart.items, { onDelete: 'CASCADE' })
    cart: CartEntity

    @Column()
    cartId: number

    @ManyToOne(() => ProductEntity)
    product: ProductEntity

    @Column()
    productId: number

    @Column({ type: 'int', default: 1 })
    quantity: number
}