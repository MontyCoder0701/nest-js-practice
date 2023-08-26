import { Test, TestingModule } from '@nestjs/testing';
import { ResetService } from '../reset/reset.service';
import { TypeORMMySqlTestingModule } from '../../test-utils/TypeORMMySqlTestingModule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetEntity } from './reset.entity';

describe('ResetService', () => {
    let service: ResetService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeORMMySqlTestingModule([ResetEntity]),
                TypeOrmModule.forFeature([ResetEntity]),
            ],
            providers: [ResetService],
        }).compile();
        service = await module.resolve(ResetService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
