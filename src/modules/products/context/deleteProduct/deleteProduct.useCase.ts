import { ProductRepository } from '@modules/products/repository/product.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @InjectRepository(ProductRepository) private productRepo: ProductRepository,
  ) {}
  private readonly logger = new Logger(DeleteProductUseCase.name);

  async execute(id: string) {
    const product = this.productRepo.findOne({ id });

    if (!product) {
      this.logger.log(`Delete failed: ${id} does not exists`);
      throw new NotFoundException('id does not exists');
    }

    await this.productRepo.deleteProduct(id);
    this.logger.log(`Soft-deleted product ${id}`);
  }
}
