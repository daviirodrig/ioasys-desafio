import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CSRF')
@Controller()
export class RootController {
  @Get()
  root(@Request() req) {
    return { csrf: req.csrfToken() };
  }
}
