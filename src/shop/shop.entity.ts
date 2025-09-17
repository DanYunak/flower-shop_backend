import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'shops' })
export class ShopEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    phone: string

    @OneToMany(() => ProductEntity, product => product.shop)
    products: ProductEntity[]
}