import { CartItemEntity } from "src/cart-item/cart-item.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'carts' })
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => UserEntity, user => user.cart)
    user: UserEntity

    @Column()
    userId: number

    @OneToMany(() => CartItemEntity, item => item.cart, { cascade: true, eager: true })
    items: CartItemEntity[]
}