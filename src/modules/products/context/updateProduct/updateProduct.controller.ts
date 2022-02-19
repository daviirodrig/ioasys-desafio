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
  ApiBearerAuth,
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
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Token not authorized' })
  @ApiForbiddenResponse({ description: 'Token not authorized' })
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Id not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductRequestBodyDTO: UpdateProductRequestBodyDTO,
    @Request() req,
  ) {
    this.logger.log('Received PATCH /products');

    if (!req.user.isAdmin) {
      throw new ForbiddenException();
    }

    const product = await this.updateProductUseCase.execute(
      id,
      updateProductRequestBodyDTO,
    );

    return instanceToInstance(product);
  }
}
