import { OrderRepository } from '@modules/orders/repository/order.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetOrderUseCase {
  constructor(
    @InjectRepository(OrderRepository) private orderRepo: OrderRepository,
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  async byUser(userId: string) {
    const user = await this.userRepo.findById(userId);

    const orders = await this.orderRepo.findByUser(user);

    return orders;
  }

  async byId(id: string) {
    const order = await this.orderRepo.findOneOrder(id);

    return order;
  }
}
