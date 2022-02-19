import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import {
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Product } from '@shared/entities/product.entity';
import { instanceToInstance } from 'class-transformer';
import { GetProductUseCase } from './getProduct.useCase';

@ApiTags('Products')
@Controller('products')
export class GetProductController {
  constructor(private getProductUseCase: GetProductUseCase) {}
  private readonly logger = new Logger(GetProductController.name);

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Success', type: Product })
  @ApiUnauthorizedResponse({ description: 'Token invalid or not found' })
  @ApiForbiddenResponse({ description: 'Token not authorized' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async get(@Request() req, @Param('id') id: string) {
    if (!req.user.isAdmin) {
      this.logger.log('Get product failed: not admin');
      throw new ForbiddenException();
    }

    const product = this.getProductUseCase.execute(id);

    return instanceToInstance(product);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Success', type: Product })
  @ApiUnauthorizedResponse({ description: 'Token invalid or not found' })
  @ApiForbiddenResponse({ description: 'Token not authorized' })
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
