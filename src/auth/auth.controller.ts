import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from './model/user.entity';
import { CreateNewUserDto } from './dto/create-new-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createNewUser(
    @Body() createNewUserDto: CreateNewUserDto,
  ): Promise<UserEntity> {
    return this.authService.createNewUser(createNewUserDto);
  }

  @Post('/signin')
  async signIn(@Body() createNewUserDto: CreateNewUserDto): Promise<object> {
    return this.authService.signIn(createNewUserDto);
  }
}
