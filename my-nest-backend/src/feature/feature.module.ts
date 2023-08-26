import { Module } from '@nestjs/common';
import { ResetModule } from './reset/reset.module';
import { TodoModule } from './todo/todo.module';

@Module({
    imports: [ResetModule, TodoModule],
})
export class FeatureModule {}
