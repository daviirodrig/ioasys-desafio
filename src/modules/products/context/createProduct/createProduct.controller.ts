import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateProductRequestBodyDTO } from '@shared/dtos/product/createProductRequestBody.dto';
import { Product } from '@shared/entities/product.entity';
import { instanceToInstance } from 'class-transformer';
import { CreateProductUseCase } from './createProduct.useCase';

@ApiTags('Products')
@Controller('products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  private readonly logger = new Logger(CreateProductController.name);

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: 'Token invalid or not found' })
  @ApiForbiddenResponse({ description: 'Token not authorized' })
  @ApiCreatedResponse({
    type: Product,
    description: 'Product created successfully',
  })
  public async create(
    @Body() createProductRequestBodyDTO: CreateProductRequestBodyDTO,
    @Request() req,
  ) {
    this.logger.log('Received POST /products');

    if (!req.user.isAdmin) {
      this.logger.log('Product creation failed: not admin');
      throw new ForbiddenException();
    }

    const product = await this.createProductUseCase.execute(
      req.user.adminId,
      createProductRequestBodyDTO,
    );

    return instanceToInstance(product);
  }
}
