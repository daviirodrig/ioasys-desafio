import { AdminRepository } from '@modules/admins/repository/admins.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProductController } from './context/createProduct/createProduct.controller';
import { CreateProductUseCase } from './context/createProduct/createProduct.useCase';
import { DeleteProductController } from './context/deleteProduct/deleteProduct.controller';
import { DeleteProductUseCase } from './context/deleteProduct/deleteProduct.useCase';
import { UpdateProductController } from './context/updateProduct/updateProduct.controller';
import { UpdateProductUseCase } from './context/updateProduct/updateProduct.useCase';
import { ProductRepository } from './repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, AdminRepository])],
  providers: [CreateProductUseCase, UpdateProductUseCase, DeleteProductUseCase],
  controllers: [
    CreateProductController,
    UpdateProductController,
    DeleteProductController,
  ],
})
export class ProductsModule {}
