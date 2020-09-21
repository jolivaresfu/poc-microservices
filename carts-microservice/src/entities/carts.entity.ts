
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartsItems } from './carts-items.entity';

@Entity()
export class Carts {
    @PrimaryGeneratedColumn('uuid')
    @OneToMany(type => CartsItems, cart => cart.cart_id)
    id: CartsItems[];

    @Column('uuid')
    user_id: string;

    @Column('uuid')
    order_id: string;

    @Column('timestamp')
    created_at: Date;

    @Column('timestamp')
    updated_at: Date;

    @Column('timestamp')
    deleted_at: Date;

}