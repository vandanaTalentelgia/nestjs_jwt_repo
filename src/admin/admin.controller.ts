import { Body, Controller, Delete, Get, HttpCode, Param, Post ,Put, Query, UseGuards} from '@nestjs/common';
import { User } from './schemas/admin.schemas';
import { AdminService } from './admin.service';
import { createUserDto,updateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Query as  ExpressQuery} from 'express-serve-static-core';
@Controller('admins')
export class AdminController {
    constructor(private adminService :AdminService ) {}
    
    @Get()
    @HttpCode(200)
    async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
        return this.adminService.findAll(query);
    }

    @Post("/create")
    @UseGuards(AuthGuard())
    @HttpCode(200)
    async createUser(
        @Body()
        Admin:createUserDto,
    ): Promise<User>{
        return this.adminService.create(Admin);
    }

    @Get(':id')
    @HttpCode(200)
    async getUserById(
        @Param('id')
        id:string
    ): Promise<User>{
        return this.adminService.findById(id);
    }

    @Put(":id")
    @HttpCode(200)
    async updateUser(
        @Param('id')
        id:string,
        @Body()
        Admin:updateUserDto,
    ): Promise<User>{
        return this.adminService.updateById(id,Admin);
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteUserById(
        @Param('id')
        id:string
    ): Promise<User>{
        return this.adminService.deleteById(id);
    }
}
