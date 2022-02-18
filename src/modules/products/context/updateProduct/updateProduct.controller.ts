import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Token not authorized' })
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Id not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductRequestBodyDTO: UpdateProductRequestBodyDTO,
  ) {
    const product = await this.updateProductUseCase.execute(
      id,
      updateProductRequestBodyDTO,
    );

    return instanceToInstance(product);
  }
}
