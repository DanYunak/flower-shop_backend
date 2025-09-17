import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { ShopEntity } from '../shop/shop.entity';

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column({ default: '' })
    imageUrl: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date
    
    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date()
    }

    @ManyToOne(() => ShopEntity, shop => shop.products, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'shopId' })
    shop: ShopEntity

    @Column()
    shopId: number
}