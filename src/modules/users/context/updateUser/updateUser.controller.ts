import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserRequestBodyDTO } from '@shared/dtos/user/updateUserRequestBody.dto';
import { instanceToInstance } from 'class-transformer';
import { UpdateUserUseCase } from './updateUser.useCase';

@ApiTags('Users')
@Controller('users')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  private readonly logger = new Logger(UpdateUserController.name);

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'User with id not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserRequestBodyDTO: UpdateUserRequestBodyDTO,
  ) {
    this.logger.log('Received PATCH /users/');
    const user = await this.updateUserUseCase.execute(
      id,
      updateUserRequestBodyDTO,
    );

    return instanceToInstance(user);
  }
}
