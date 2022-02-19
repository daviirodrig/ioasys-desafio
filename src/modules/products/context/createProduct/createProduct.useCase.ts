import { AdminRepository } from '@modules/admins/repository/admins.repository';
import { ProductRepository } from '@modules/products/repository/product.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductRequestBodyDTO } from '@shared/dtos/product/createProductRequestBody.dto';
import { Product } from '@shared/entities/product.entity';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @InjectRepository(ProductRepository) private productRepo: ProductRepository,
    @InjectRepository(AdminRepository) private adminRepo: AdminRepository,
  ) {}
  private readonly logger = new Logger(CreateProductUseCase.name);

  async execute(
    adminId: string,
    createProductRequestBodyDTO: CreateProductRequestBodyDTO,
  ): Promise<Product> {
    const admin = await this.adminRepo.findOne({ id: adminId });

    const product = this.productRepo.createProduct(
      admin,
      createProductRequestBodyDTO,
    );

    this.logger.log('Product created successfully');

    return product;
  }
}
