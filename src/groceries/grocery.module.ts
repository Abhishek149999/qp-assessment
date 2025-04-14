import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryEntity } from '../entities/grocery.entity';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroceryEntity])],
  controllers: [GroceryController],
  providers: [GroceryService],
})
export class GroceryModule {}