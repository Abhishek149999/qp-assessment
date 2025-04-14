import { IsNumber, IsString } from 'class-validator';

export class GroceryModel {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  inventory: number;
}