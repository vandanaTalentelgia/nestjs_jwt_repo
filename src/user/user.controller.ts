import { Body, Controller, Res, HttpException, HttpStatus, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('users')
//to add category in the swagger
@ApiTags('Auth')
export class UserController {
    constructor(private userService :UserService ) {}
    
    @Post("/signup")
    async signUp(
        @Body()
        signUpDto:signUpDto,
        @Res() res: Response
        ): Promise<void> { 
        const signUp=await this.userService.signUp(signUpDto);

        if(signUp){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! User has been Registered.",
                 data : signUp,
             });
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post("/login")
    async login(
        @Body()
        loginDto:loginDto,
        @Res() res: Response
        ): Promise<void> {
        const login= await this.userService.login(loginDto);
        if(login){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! User has been Logged In.",
                 data : login,
             });
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
