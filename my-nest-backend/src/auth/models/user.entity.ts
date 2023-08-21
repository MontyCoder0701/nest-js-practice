import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { TodoEntity } from 'src/todo/todo.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => TodoEntity, todo => todo.user)
    todos: TodoEntity[];
}

// the entity is used to define the shape of the data that will be stored in the database
