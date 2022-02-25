import {
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Request,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { Order } from '@shared/entities/order.entity';
import { instanceToInstance } from 'class-transformer';
import { GetOrderUseCase } from './getOrder.useCase';

@ApiTags('Orders')
@Controller('orders')
export class GetOrderController {
  constructor(private getOrderUseCase: GetOrderUseCase) {}
  private readonly logger = new Logger(GetOrderController.name);

  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: Order, description: 'Success' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async getOne(@Param() id: string, @Request() req) {
    this.logger.log('Received GET /orders/:id');

    const order = await this.getOrderUseCase.byId(id);

    if (order.user.id != req.user.id) {
      throw new ForbiddenException();
    }

    return instanceToInstance(order);
  }

  @Get()
  @UseAuth()
  @ApiOkResponse({ type: Order, description: 'Success' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async getAllUser(@Request() req) {
    this.logger.log('Received GET /orders/');

    const orders = await this.getOrderUseCase.byUser(req.user.id);

    return instanceToInstance(orders);
  }
}
