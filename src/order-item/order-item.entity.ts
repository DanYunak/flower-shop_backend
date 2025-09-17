import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from '../order/order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => OrderEntity, order => order.items, { onDelete: 'CASCADE' })
    order: OrderEntity

    @ManyToOne(() => ProductEntity, { eager: true })
    product: ProductEntity

    @Column()
    quantity: number

    @Column()
    price: number
}