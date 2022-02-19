import { AdminRepository } from '@modules/admins/repository/admins.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductController } from './context/createProduct/createProduct.controller';
import { CreateProductUseCase } from './context/createProduct/createProduct.useCase';
import { DeleteProductController } from './context/deleteProduct/deleteProduct.controller';
import { DeleteProductUseCase } from './context/deleteProduct/deleteProduct.useCase';
import { GetProductController } from './context/getProduct/getProduct.controller';
import { GetProductUseCase } from './context/getProduct/getProduct.useCase';
import { UpdateProductController } from './context/updateProduct/updateProduct.controller';
import { UpdateProductUseCase } from './context/updateProduct/updateProduct.useCase';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, AdminRepository])],
  providers: [
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    GetProductUseCase,
  ],
  controllers: [
    CreateProductController,
    UpdateProductController,
    DeleteProductController,
    GetProductController,
  ],
})
export class ProductsModule {}
