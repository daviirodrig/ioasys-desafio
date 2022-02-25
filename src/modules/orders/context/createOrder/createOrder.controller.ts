import { Body, Controller, Logger, Post, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { CreateOrderRequestBodyDTO } from '@shared/dtos/order/createOrderRequestBody.dto';
import { Order } from '@shared/entities/order.entity';
import { instanceToInstance } from 'class-transformer';
import { CreateOrderUseCase } from './createOrder.useCase';

@ApiTags('Orders')
@Controller('orders')
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}
  private readonly logger = new Logger(CreateOrderController.name);

  @Post()
  @UseAuth()
  @ApiCreatedResponse({
    type: Order,
    description: 'Order created successfully',
  })
  async create(
    @Body() createOrderRequestBodyDTO: CreateOrderRequestBodyDTO,
    @Request() req,
  ) {
    this.logger.log('Received POST /orders');

    const order = await this.createOrderUseCase.execute(
      req.user.id,
      createOrderRequestBodyDTO.products,
    );

    return instanceToInstance(order);
  }
}
