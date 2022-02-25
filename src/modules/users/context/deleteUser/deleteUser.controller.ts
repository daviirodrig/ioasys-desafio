import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { DeleteUserUseCase } from './deleteUser.useCase';

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  private readonly logger = new Logger(DeleteUserController.name);

  @Delete(':id')
  @UseAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@Param('id') id: string, @Request() req) {
    this.logger.log('Received DELETE /users/');

    if (req.user.id != id) {
      this.logger.log('Delete failed: token user does not match');
      throw new ForbiddenException('token user does not match');
    }

    await this.deleteUserUseCase.execute(id);
  }
}
