import { Test, TestingModule } from '@nestjs/testing';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { RolesGuard } from '../AuthGuard/roles.guard';
import { GroceryModel } from './model/groceryModel';

describe('GroceryController', () => {
  let groceryController: GroceryController;
  let groceryService: GroceryService;

  const mockGroceryService = {
    addGrocery: jest.fn(),
    getAllGroceries: jest.fn(),
    updateGrocery: jest.fn(),
    deleteGrocery: jest.fn(),
    updateInventory: jest.fn(),
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryController],
      providers: [
        {
          provide: GroceryService,
          useValue: mockGroceryService,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) }) // Mock RolesGuard
      .compile();

    groceryController = module.get<GroceryController>(GroceryController);
    groceryService = module.get<GroceryService>(GroceryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addGrocery', () => {
    it('should call groceryService.addGrocery with the correct arguments', async () => {
      const grocery: GroceryModel = {
        name: 'Apple',
        price: 2.5,
        description: 'Fresh apples',
        inventory: 100,
      };

      mockGroceryService.addGrocery.mockResolvedValue({
        id: 1,
        ...grocery,
      });

      await groceryController.addGrocery(grocery, mockResponse);

      expect(mockGroceryService.addGrocery).toHaveBeenCalledWith(grocery);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Grocery added successfully',
        data: { id: 1, ...grocery },
      });
    });
  });

  describe('getAllGroceries', () => {
    it('should call groceryService.getAllGroceries and return the list of groceries', async () => {
      const groceries = [
        { id: 1, name: 'Apple', price: 2.5, description: 'Fresh apples', inventory: 100 },
        { id: 2, name: 'Banana', price: 1.2, description: 'Fresh bananas', inventory: 50 },
      ];

      mockGroceryService.getAllGroceries.mockResolvedValue(groceries);

      await groceryController.getAllGroceries(mockResponse);

      expect(mockGroceryService.getAllGroceries).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: groceries,
      });
    });
  });

  describe('updateGrocery', () => {
    it('should call groceryService.updateGrocery with the correct arguments', async () => {
      const updates = { name: 'Updated Apple', price: 3.0 };
      const updatedGrocery = { id: 1, ...updates, description: 'Fresh apples', inventory: 100 };

      mockGroceryService.updateGrocery.mockResolvedValue(updatedGrocery);

      await groceryController.updateGrocery(1, updates, mockResponse);

      expect(mockGroceryService.updateGrocery).toHaveBeenCalledWith(1, updates);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Grocery updated successfully',
        data: updatedGrocery,
      });
    });
  });

  describe('deleteGrocery', () => {
    it('should call groceryService.deleteGrocery with the correct arguments', async () => {
      mockGroceryService.deleteGrocery.mockResolvedValue(undefined);

      await groceryController.deleteGrocery(1, mockResponse);

      expect(mockGroceryService.deleteGrocery).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Grocery deleted successfully',
      });
    });
  });

  describe('updateInventory', () => {
    it('should call groceryService.updateInventory with the correct arguments', async () => {
      const updatedInventory = { id: 1, inventory: 150 };

      mockGroceryService.updateInventory.mockResolvedValue(updatedInventory);

      await groceryController.updateInventory(1, { inventory: 150 }, mockResponse);

      expect(mockGroceryService.updateInventory).toHaveBeenCalledWith(1, 150);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Inventory updated successfully',
        data: updatedInventory,
      });
    });
  });
});