import { OrderRepository } from '@modules/orders/repository/order.repository';
import { ProductRepository } from '@modules/products/repository/product.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @InjectRepository(OrderRepository) private orderRepo: OrderRepository,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(ProductRepository) private productRepo: ProductRepository,
  ) {}

  private readonly logger = new Logger(CreateOrderUseCase.name);

  async execute(userId: string, productIds: Array<string>) {
    const user = await this.userRepo.findById(userId);
    const products = await this.productRepo.findByIds(productIds);

    const order = this.orderRepo.createOrder(user, products);

    this.logger.log(`Order for user ${userId} created`);

    return order;
  }
}
