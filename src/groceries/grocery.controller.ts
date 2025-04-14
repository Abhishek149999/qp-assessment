import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { GroceryModel } from './model/groceryModel';
import { RolesGuard } from '../AuthGuard/roles.guard';
import { Roles } from '../utils/util';

@Controller('/api/groceries')
@UseGuards(RolesGuard)
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post()
  @Roles('Admin')
  async addGrocery(@Body() grocery: GroceryModel, @Res() response: any) {
    const result = await this.groceryService.addGrocery(grocery);
    return response.status(201).json({ success: true, message: 'Grocery added successfully', data: result });
  }

  @Get()
  @Roles('Admin', 'User')
  async getAllGroceries(@Res() response: any) {
    const result = await this.groceryService.getAllGroceries();
    return response.status(200).json({ success: true, data: result });
  }

  @Put('/:id')
  @Roles('Admin')
  async updateGrocery(@Param('id') id: number, @Body() updates: Partial<GroceryModel>, @Res() response: any) {
    const result = await this.groceryService.updateGrocery(id, updates);
    return response.status(200).json({ success: true, message: 'Grocery updated successfully', data: result });
  }

  @Delete('/:id')
  @Roles('Admin')
  async deleteGrocery(@Param('id') id: number, @Res() response: any) {
    await this.groceryService.deleteGrocery(id);
    return response.status(200).json({ success: true, message: 'Grocery deleted successfully' });
  }

  @Patch('/:id/inventory')
  @Roles('Admin')
  async updateInventory(@Param('id') id: number, @Body() body: { inventory: number }, @Res() response: any) {
    const result = await this.groceryService.updateInventory(id, body.inventory);
    return response.status(200).json({ success: true, message: 'Inventory updated successfully', data: result });
  }
}