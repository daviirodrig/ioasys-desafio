import { Controller, Get, Param, Request } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { Order } from '@shared/entities/order.entity';
import { instanceToInstance } from 'class-transformer';
import { GetOrderUseCase } from './getOrder.useCase';

@ApiTags('Orders')
@Controller('orders')
export class GetOrderController {
  constructor(private getOrderUseCase: GetOrderUseCase) {}

  @Get(':id')
  @UseAuth()
  @ApiOkResponse({ type: Order, description: 'Success' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async getOne(@Param() id: string) {
    const order = await this.getOrderUseCase.byId(id);

    return instanceToInstance(order);
  }

  @Get()
  @UseAuth()
  @ApiOkResponse({ type: Order, description: 'Success' })
  @ApiNotFoundResponse({ description: 'Order not found' })
  async getAllUser(@Request() req) {
    const orders = await this.getOrderUseCase.byUser(req.user.id);

    return instanceToInstance(orders);
  }
}
