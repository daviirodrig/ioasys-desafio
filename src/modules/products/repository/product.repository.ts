import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { UpdateProductDTO } from '@shared/dtos/product/updateProduct.dto';
import { Admin } from '@shared/entities/admin.entity';
import { Product } from '@shared/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({ name });

    return product;
  }

  async createProduct(
    admin: Admin,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const product = this.create({ ...createProductDTO, admin: admin });

    return this.save(product);
  }

  async updateProduct(
    id: string,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    return this.save({ id: id, ...updateProductDTO });
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.findOne(id);

    return this.softRemove(product);
  }

  async decreaseStorage(product: Product): Promise<void> {
    await this.update(product.id, { storage: product.storage - 1 });
  }
}
