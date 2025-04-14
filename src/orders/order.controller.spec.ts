import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderModel } from './model/orderModel';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    placeOrder: jest.fn(),
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('placeOrder', () => {
    it('should call orderService.placeOrder with the correct arguments', async () => {
      const order: OrderModel = {
        userId: 1,
        items: [
          { groceryId: 1, quantity: 2 },
          { groceryId: 2, quantity: 5 },
        ],
      };

      const mockOrderResponse = {
        id: 1,
        userId: 1,
        totalPrice: 20.5,
        items: [
          {
            id: 1,
            quantity: 2,
            grocery: {
              id: 1,
              name: 'Apple',
              price: 2.5,
              description: 'Fresh apples',
            },
          },
          {
            id: 2,
            quantity: 5,
            grocery: {
              id: 2,
              name: 'Banana',
              price: 1.2,
              description: 'Fresh bananas',
            },
          },
        ],
      };

      mockOrderService.placeOrder.mockResolvedValue(mockOrderResponse);

      await orderController.placeOrder(order, mockResponse);

      expect(mockOrderService.placeOrder).toHaveBeenCalledWith(order.userId, order.items);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Order placed successfully',
        data: mockOrderResponse,
      });
    });

    it('should return an error response if orderService.placeOrder throws an error', async () => {
      const order: OrderModel = {
        userId: 1,
        items: [
          { groceryId: 1, quantity: 2 },
          { groceryId: 2, quantity: 5 },
        ],
      };

      const errorMessage = 'Grocery item is not available or insufficient inventory.';
      mockOrderService.placeOrder.mockRejectedValue(new Error(errorMessage));

      await orderController.placeOrder(order, mockResponse);

      expect(mockOrderService.placeOrder).toHaveBeenCalledWith(order.userId, order.items);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: errorMessage,
      });
    });
  });
});