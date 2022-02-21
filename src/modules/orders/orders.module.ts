import { ProductRepository } from '@modules/products/repository/product.repository';
import { UserRepository } from '@modules/users/repository/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOrderController } from './context/createOrder/createOrder.controller';
import { CreateOrderUseCase } from './context/createOrder/createOrder.useCase';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      OrderRepository,
      UserRepository,
    ]),
  ],
  providers: [CreateOrderUseCase],
  controllers: [CreateOrderController],
})
export class OrdersModule {}
