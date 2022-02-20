import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import {
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteProductUseCase } from './deleteProduct.useCase';

@ApiTags('Products')
@Controller('products')
export class DeleteProductController {
  constructor(private deleteProductUseCase: DeleteProductUseCase) {}
  private readonly logger = new Logger(DeleteProductController.name);

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: 'Token invalid or not found' })
  @ApiForbiddenResponse({ description: 'Token not authorized' })
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
