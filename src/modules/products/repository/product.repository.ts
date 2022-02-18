import { CreateProductDTO } from '@shared/dtos/product/createProduct.dto';
import { UpdateProductDTO } from '@shared/dtos/product/updateProduct.dto';
import { Product } from '@shared/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({ name });

    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = this.create(createProductDTO);

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
}
