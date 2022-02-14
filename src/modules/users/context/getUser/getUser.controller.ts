import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';
import { GetUserUseCase } from './getUser.useCase';

@ApiTags('Users')
@Controller('users')
export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}
  private readonly logger = new Logger(GetUserController.name);

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async get(@Param('id') id: string) {
    this.logger.log('Received GET /users/');
    const user = this.getUserUseCase.execute(id);
    return instanceToInstance(user);
  }
}
