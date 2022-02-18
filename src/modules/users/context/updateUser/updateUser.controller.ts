import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserRequestBodyDTO } from '@shared/dtos/user/updateUserRequestBody.dto';
import { instanceToInstance } from 'class-transformer';
import { UpdateUserUseCase } from './updateUser.useCase';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  private readonly logger = new Logger(UpdateUserController.name);

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Token not authorized' })
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'User with id not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserRequestBodyDTO: UpdateUserRequestBodyDTO,
    @Request() req,
  ) {
    this.logger.log('Received PATCH /users/');

    if (req.user.id != id) {
      throw new ForbiddenException();
    }

    const user = await this.updateUserUseCase.execute(
      id,
      updateUserRequestBodyDTO,
    );

    return instanceToInstance(user);
  }
}
