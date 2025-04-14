import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity, OrderItemEntity } from '../entities/order.entity';
import { GroceryEntity } from '../entities/grocery.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, GroceryEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}