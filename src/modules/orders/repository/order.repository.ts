import { Order } from '@shared/entities/order.entity';
import { Product } from '@shared/entities/product.entity';
import { User } from '@shared/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(user: User, products: Array<Product>) {
    const order = this.create({
      user: user,
      products: products,
    });

    return this.save(order);
  }
}
