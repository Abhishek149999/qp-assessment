import { Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryEntity } from '../entities/grocery.entity';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(GroceryEntity)
    private readonly groceryRepo: Repository<GroceryEntity>,
  ) {}

  async addGrocery(grocery: Partial<GroceryEntity>) {
    const newGrocery = this.groceryRepo.create(grocery);
    return await this.groceryRepo.save(newGrocery);
  }

  async getAllGroceries() {
    return await this.groceryRepo.find();
  }

  async updateGrocery(id: number, updates: Partial<GroceryEntity>) {
    await this.groceryRepo.update(id, updates);
    return await this.groceryRepo.findOne({ where: { id } });
  }

  async deleteGrocery(id: number) {
    return await this.groceryRepo.delete(id);
  }

  async updateInventory(id: number, inventory: number) {
    await this.groceryRepo.update(id, { inventory });
    return await this.groceryRepo.findOne({ where: { id } });
  }
}