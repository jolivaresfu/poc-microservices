
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Carts } from './carts.entity';

@Entity()
export class CartsItems {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Carts, cart => cart.id)
    @JoinColumn({ name: "cart_id" })
    cart_id: Carts;

    @Column('uuid')
    product_id: string;

    @Column('int')
    quantity: number;

    @Column('timestamp')
    created_at: Date;

    @Column('timestamp')
    updated_at: Date;

    @Column('timestamp')
    deleted_at: Date;
}