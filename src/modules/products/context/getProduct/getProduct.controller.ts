import {
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Request,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { Product } from '@shared/entities/product.entity';
import { instanceToInstance } from 'class-transformer';
import { GetProductUseCase } from './getProduct.useCase';

@ApiTags('Products')
@Controller('products')
export class GetProductController {
  constructor(private getProductUseCase: GetProductUseCase) {}
  private readonly logger = new Logger(GetProductController.name);

  @Get(':id')
  @UseAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async get(@Request() req, @Param('id') id: string) {
    if (!req.user.isAdmin) {
      this.logger.log('Get product failed: not admin');
      throw new ForbiddenException();
    }

    const product = this.getProductUseCase.execute(id);

    return instanceToInstance(product);
  }

  @Get()
  @UseAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getAll(@Request() req) {
    if (!req.user.isAdmin) {
      this.logger.log('Get product failed: not admin');
      throw new ForbiddenException();
    }

    const products = this.getProductUseCase.execute();

    return instanceToInstance(products);
  }
}
