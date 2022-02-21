import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { CreateProductRequestBodyDTO } from '@shared/dtos/product/createProductRequestBody.dto';
import { Product } from '@shared/entities/product.entity';
import { instanceToInstance } from 'class-transformer';
import { CreateProductUseCase } from './createProduct.useCase';

@ApiTags('Products')
@Controller('products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  private readonly logger = new Logger(CreateProductController.name);

  @Post()
  @UseAuth()
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
