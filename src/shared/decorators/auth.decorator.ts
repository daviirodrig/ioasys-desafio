import { JwtAuthGuard } from '@modules/auth/jwt.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function UseAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiCookieAuth(),
    ApiUnauthorizedResponse({ description: 'Token invalid or not found' }),
    ApiForbiddenResponse({ description: 'Token not authorized' }),
  );
}
