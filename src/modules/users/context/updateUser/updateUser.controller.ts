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
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { UpdateUserRequestBodyDTO } from '@shared/dtos/user/updateUserRequestBody.dto';
import { instanceToInstance } from 'class-transformer';
import { UpdateUserUseCase } from './updateUser.useCase';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  private readonly logger = new Logger(UpdateUserController.name);

  @Patch(':id')
  @UseAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserRequestBodyDTO: UpdateUserRequestBodyDTO,
    @Request() req,
  ) {
    this.logger.log('Received PATCH /users/');

    if (req.user.id != id) {
      this.logger.log('Update failed: token user does not match');
      throw new ForbiddenException('token user does not match');
    }

    const user = await this.updateUserUseCase.execute(
      id,
      updateUserRequestBodyDTO,
    );

    return instanceToInstance(user);
  }
}
