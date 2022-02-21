import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderRequestBodyDTO } from '@shared/dtos/order/createOrderRequestBody.dto';
import { Order } from '@shared/entities/order.entity';
import { instanceToInstance } from 'class-transformer';
import { CreateOrderUseCase } from './createOrder.useCase';

@ApiTags('Orders')
@Controller('orders')
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: 'Token invalid or not found' })
  @ApiForbiddenResponse({ description: 'Token not authorized' })
  @ApiCreatedResponse({
    type: Order,
    description: 'Order created successfully',
  })
  async create(
    @Body() createOrderRequestBodyDTO: CreateOrderRequestBodyDTO,
    @Request() req,
  ) {
    const order = await this.createOrderUseCase.execute(
      req.user.id,
      createOrderRequestBodyDTO.products,
    );

    return instanceToInstance(order);
  }
}
