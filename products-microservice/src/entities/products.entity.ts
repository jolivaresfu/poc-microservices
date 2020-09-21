
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    sku: string;

    @Column('text')
    description: string;

    @Column('int')
    price: number;

    @Column('timestamp')
    created_at: Date;

    @Column('timestamp')
    updated_at: Date;

    @Column('timestamp')
    deleted_at: Date;
}