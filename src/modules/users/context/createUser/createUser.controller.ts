import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';
import { User } from '@shared/entities/user.entity';
import { instanceToInstance } from 'class-transformer';
import { CreateUserUseCase } from './createUser.useCase';

@ApiTags('Users')
@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  private readonly logger = new Logger(CreateUserController.name);

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Returned on validation error',
  })
  public async create(
    @Body() createUserRequestBodyDTO: CreateUserRequestBodyDTO,
  ) {
    this.logger.log('Received POST /users/');
    const user = await this.createUserUseCase.execute(createUserRequestBodyDTO);
    return instanceToInstance(user);
  }
}
