import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from '../auth/models/user.entity';

@Entity('todos')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(() => UserEntity, (user) => user.todos)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
