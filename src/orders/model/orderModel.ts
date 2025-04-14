import { IsArray, IsNumber } from 'class-validator';

export class OrderItem {
  @IsNumber()
  groceryId: number;

  @IsNumber()
  quantity: number;
}

export class OrderModel {
  @IsNumber()
  userId: number;

  @IsArray()
  items: OrderItem[];
}