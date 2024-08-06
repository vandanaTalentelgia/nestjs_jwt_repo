import { Body, Controller, Delete, Get, Param, Post ,Put} from '@nestjs/common';
import { User } from './schemas/user.schemas';
import { UserService } from './user.service';
import { createUserDto,updateUserDto } from './dto/create-user.dto';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
    constructor(private userService :UserService ) {}
    
    @Get()
    async getAllUser(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Post("/add")
    async createUser(
        @Body()
        user:createUserDto,
    ): Promise<User>{
        return this.userService.create(user);
    }

    @Get(':id')
    async getUserById(
        @Param('id')
        id:string
    ): Promise<User>{
        return this.userService.findById(id);
    }

    @Put(":id")
    async updateUser(
        @Param('id')
        id:string,
        @Body()
        user:updateUserDto,
    ): Promise<User>{
        return this.userService.updateById(id,user);
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id')
        id:string
    ): Promise<User>{
        return this.userService.deleteById(id);
    }

    @Post("/signup")
    async signUp(
        @Body()
        signUpDto:signUpDto,
    ): Promise<{token : string}>{
        return this.userService.signUp(signUpDto);
    }

    @Post("/login")
    async login(
        @Body()
        loginDto:loginDto,
    ): Promise<{token : string}>{
        return this.userService.login(loginDto);
    }
}
