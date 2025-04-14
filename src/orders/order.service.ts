import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryEntity } from '../entities/grocery.entity';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(GroceryEntity)
    private readonly groceryRepo: Repository<GroceryEntity>,
  ) {}

  async placeOrder(userId: number, items: { groceryId: number; quantity: number }[]) {
    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
      const grocery = await this.groceryRepo.findOne({ where: { id: item.groceryId } });
      if (!grocery || grocery.inventory < item.quantity) {
        throw new Error(`Grocery item ${item.groceryId} is not available or insufficient inventory.`);
      }

      grocery.inventory -= item.quantity;
      await this.groceryRepo.save(grocery);

      orderItems.push({
        grocery: {
          id: grocery.id,
          name: grocery.name,
          price: grocery.price,
          description: grocery.description,
        },
        quantity: item.quantity,
      });
      totalPrice += grocery.price * item.quantity;
    }

    const newOrder = this.orderRepo.create({ userId, items: orderItems, totalPrice });
    const savedOrder = await this.orderRepo.save(newOrder);

  return {
    success: true,
    message: 'Order placed successfully',
    data: {
      id: savedOrder.id,
      userId: savedOrder.userId,
      totalPrice: savedOrder.totalPrice,
      items: savedOrder.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        grocery: item.grocery,
      })),
    },
  };
  }
}