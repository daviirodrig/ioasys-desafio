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
  ApiBearerAuth,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Token not authorized' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    this.logger.log('Received DELETE /products');

    if (!req.user.isAdmin) {
      throw new ForbiddenException();
    }

    await this.deleteProductUseCase.execute(id);
  }
}
