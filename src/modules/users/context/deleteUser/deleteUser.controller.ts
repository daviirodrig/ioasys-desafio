import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteUserUseCase } from './deleteUser.useCase';

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  private readonly logger = new Logger(DeleteUserController.name);

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@Param('id') id: string) {
    this.logger.log('Received DELETE /users/');
    this.deleteUserUseCase.execute(id);
  }
}
