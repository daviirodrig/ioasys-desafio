import { PartialType } from '@nestjs/swagger';
import { CreateProductDTO } from './createProduct.dto';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
