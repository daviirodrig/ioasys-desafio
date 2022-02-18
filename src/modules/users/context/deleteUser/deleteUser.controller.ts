import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteUserUseCase } from './deleteUser.useCase';

@ApiTags('Users')
@Controller('users')
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  private readonly logger = new Logger(DeleteUserController.name);

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Token not authorized' })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@Param('id') id: string, @Request() req) {
    this.logger.log('Received DELETE /users/');
    if (req.user.id != id) {
      throw new ForbiddenException();
    } else {
      this.deleteUserUseCase.execute(id);
    }
  }
}
