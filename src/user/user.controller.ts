import { Body, Controller, HttpCode, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
    constructor(private userService :UserService ) {}
    
    @Post("/signup")
    @HttpCode(200)
    async signUp(
        @Body()
        signUpDto:signUpDto,
    ): Promise<{token : string}>{
        return this.userService.signUp(signUpDto);
    }

    @Post("/login")
    @HttpCode(200)
    async login(
        @Body()
        loginDto:loginDto,
    ): Promise<{token : string}>{
        return this.userService.login(loginDto);
    }
}
