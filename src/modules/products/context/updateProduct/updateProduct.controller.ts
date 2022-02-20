import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
  Request,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateProductRequestBodyDTO } from '@shared/dtos/product/updateProductRequestBody.dto';
import { instanceToInstance } from 'class-transformer';
import { UpdateProductUseCase } from './updateProduct.useCase';

@ApiTags('Products')
@Controller('products')
export class UpdateProductController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  private readonly logger = new Logger(UpdateProductController.name);

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: 'Token invalid or not found' })
  @ApiForbiddenResponse({ description: 'Token not authorized' })
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductRequestBodyDTO: UpdateProductRequestBodyDTO,
    @Request() req,
  ) {
    this.logger.log('Received PATCH /products');

    if (!req.user.isAdmin) {
      this.logger.log('Update product failed: not admin');
      throw new ForbiddenException();
    }

    const product = await this.updateProductUseCase.execute(
      id,
      updateProductRequestBodyDTO,
    );

    return instanceToInstance(product);
  }
}
