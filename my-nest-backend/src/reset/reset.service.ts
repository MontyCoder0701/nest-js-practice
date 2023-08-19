import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetEntity } from './reset.entity';
import { Reset } from './reset.interface';


@Injectable()
export class ResetService {
    constructor(
        @InjectRepository(ResetEntity) private resetRepo: Repository<ResetEntity>
    ) { }

    async create(reset: Reset) {
        return await this.resetRepo.save(reset);
    }

    async findOneByToken(token: string) {
        return await this.resetRepo.findOne({
            where: { token: token }
        });
    }

}

// service manipulates the actual data to be stored in the database
// you need to inject the repository into the service to be able to use it (controller -> service -> repository)
