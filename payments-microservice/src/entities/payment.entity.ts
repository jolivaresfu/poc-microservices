
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    order_id: string;

    @Column()
    kind: string;

    @Column()
    method: string;

    @Column('text')
    external_reference_id: string;

    @Column()
    status: string;

    @Column('timestamp')
    created_at: Date;

    @Column('timestamp')
    updated_at: Date;

    @Column('timestamp')
    deleted_at: Date;
}