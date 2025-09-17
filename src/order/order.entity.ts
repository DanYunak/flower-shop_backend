import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItemEntity } from '../order-item/order-item.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userEmail: string

    @Column()
    userPhone: string

    @Column()
    deliveryAddress: string

    @Column()
    totalPrice: number

    @CreateDateColumn()
    createdAd: Date

    @OneToMany(() => OrderItemEntity, item => item.order, { cascade: true })
    items: OrderItemEntity[]
}