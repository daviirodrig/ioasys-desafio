import {
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Request,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { DeleteProductUseCase } from './deleteProduct.useCase';

@ApiTags('Products')
@Controller('products')
export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}
  private readonly logger = new Logger(DeleteProductController.name);

  @Delete(':id')
  @UseAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async delete(@Param('id') id: string, @Request() req) {
    this.logger.log('Received DELETE /products');

    if (!req.user.isAdmin) {
      this.logger.log('Delete product failed: not admin');
      throw new ForbiddenException();
    }

    await this.deleteProductUseCase.execute(id);
  }
}
