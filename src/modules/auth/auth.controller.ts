import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequestDTO } from '@shared/dtos/auth/loginRequest.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Token issued sucessfully (Http-only cookie)' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginRequestDTO })
  async login(@Request() req, @Res() res: Response) {
    this.logger.log('Received POST /auth/login');

    const token = await this.authService.login(req.user);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000), // 1 hour
      })
      .send({ success: true });
  }
}
