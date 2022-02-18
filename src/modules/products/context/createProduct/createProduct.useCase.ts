import { ProductRepository } from '@modules/products/repository/product.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductRequestBodyDTO } from '@shared/dtos/product/createProductRequestBody.dto';
import { Product } from '@shared/entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @InjectRepository(ProductRepository) private productRepo: ProductRepository,
  ) {}

  async execute(
    createProductRequestBodyDTO: CreateProductRequestBodyDTO,
  ): Promise<Product> {
    return this.productRepo.createProduct(createProductRequestBodyDTO);
  }
}
