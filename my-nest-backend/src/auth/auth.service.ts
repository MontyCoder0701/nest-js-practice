import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) { }

    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { email: email }
        });
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id: id }
        });
    }

    async update(id: number, data): Promise<any> {
        return await this.userRepository.update(id, data);
    }
}

// service interacts with the database
// constructor injects the database repository into the service
// uses interface that defines the user object
// findOneByEmail method uses the repository to find a user by email
