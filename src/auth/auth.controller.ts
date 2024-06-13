import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('login')
  async login(@Body() requestBody) {
    return this.authService.login(requestBody);
  }

  @Post('signup')
  @Public()
  async signup(@Body() requestBody) {
    // console.log("req", requestBody);
    return this.authService.signup(requestBody);
  }

  @Post('update')
  @Public()
  async update(@Body() requestBody) {
    // console.log("req", requestBody);
    return this.authService.update(requestBody);
  }
}
