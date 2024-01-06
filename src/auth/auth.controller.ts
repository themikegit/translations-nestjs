import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/user-credentials.dto';
import { AuthService } from './auth.service';

////auth is controler
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  ///and these down are handlers
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
