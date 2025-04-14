import { Body, Controller, Post, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderModel } from './model/orderModel';

@Controller('/api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async placeOrder(@Body() order: OrderModel, @Res() response: any) {
    try {
      const result = await this.orderService.placeOrder(order.userId, order.items);
      return response.status(201).json({ success: true, message: 'Order placed successfully', data: result });
    } catch (error) {
      return response.status(400).json({ success: false, message: error.message });
    }
  }
}