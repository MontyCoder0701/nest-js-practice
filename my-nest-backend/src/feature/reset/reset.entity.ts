import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('password_reset')
export class ResetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    token: string;
}

// entity defines how the data goes in the actual DB like a schema (model)
