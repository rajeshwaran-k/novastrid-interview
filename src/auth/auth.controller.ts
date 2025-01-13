import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserSignupDto } from './auth.dto';
import { Auth, GetUserFromToken } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: UserSignupDto){
    return this.authService.signup(dto)
  }

  @Post('login')
  login(@Body() dto: UserLoginDto){
    return this.authService.login(dto)
  }

  @Auth()
  @Post('chat/bulkupload')
  @UseInterceptors(FileInterceptor('file'))
  extractFromExcel(
    @UploadedFile() file: Express.Multer.File,
    @GetUserFromToken() user: User,
  ) {
    return this.authService.uploadFromExcel( user, file);
  }
}
