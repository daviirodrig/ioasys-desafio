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

  async findByUser(user: User): Promise<Array<Order>> {
    const orders = await this.find({
      where: { user: user },
      relations: ['user', 'products'],
    });

    return orders;
  }

  async findOneOrder(id: string) {
    const order = await this.findOne({
      where: id,
      relations: ['user', 'products'],
    });

    return order;
  }
}
