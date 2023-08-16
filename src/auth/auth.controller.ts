import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtToken, Otp } from './return-types';
import { User } from './schemas/user.schema';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @ApiCreatedResponse({ type: JwtToken })
  async signUp(@Body() signUpDto: SignUpDto): Promise<JwtToken> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: JwtToken })
  @ApiUnauthorizedResponse({ description: 'Incorrect email or password.' })
  async login(@Body() loginDto: LoginDto): Promise<JwtToken> {
    return await this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOkResponse({ type: Otp })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<Otp> {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOkResponse()
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<User> {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
