import { ProductRepository } from '@modules/products/repository/product.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductRequestBodyDTO } from '@shared/dtos/product/updateProductRequestBody.dto';
import { Product } from '@shared/entities/product.entity';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @InjectRepository(ProductRepository) private productRepo: ProductRepository,
  ) {}
  private readonly logger = new Logger(UpdateProductUseCase.name);

  async execute(
    id: string,
    updateProductRequestBodyDTO: UpdateProductRequestBodyDTO,
  ): Promise<Product> {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      this.logger.log(`Update failed: ${id} does not exist`);
      throw new NotFoundException(`${id} does not exist`);
    }

    await this.productRepo.updateProduct(id, updateProductRequestBodyDTO);

    const newProduct = await this.productRepo.findOne(id);
    return newProduct;
  }
}
