import { hash } from "bcrypt";
import { CartEntity } from "src/cart/cart.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ select: false })
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }

    @OneToOne(() => CartEntity, cart => cart.user, { cascade: true })
    @JoinColumn()
    cart: CartEntity
}