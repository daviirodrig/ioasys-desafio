import { ProductRepository } from '@modules/products/repository/product.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetProductUseCase {
  constructor(
    @InjectRepository(ProductRepository) private productRepo: ProductRepository,
  ) {}
  private readonly logger = new Logger(GetProductUseCase.name);

  async execute(id?: string) {
    if (!id) {
      const products = this.productRepo.find();

      return products;
    }

    const product = this.productRepo.findOne({ id });

    if (!product) {
      this.logger.log('Get product failed: product not found');
      throw new NotFoundException();
    }

    return product;
  }
}
