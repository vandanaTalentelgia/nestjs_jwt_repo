import { Body, Controller, Delete, Get, Res, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from './schemas/admin.schemas';
import { AdminService } from './admin.service';
import { createUserDto, updateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


@Controller('admins')
//to add category in the swagger
@ApiTags('Admin CRUD')
// Apply security to all Swagger functions; remove and add before specific functions to secure selectively
@ApiSecurity('JWT-auth')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Get("/get")
    @UseGuards(AuthGuard())
    async getAllUsers(@Query() query: ExpressQuery, @Res() res: Response): Promise<void> {
        const getAllUsers = await this.adminService.findAll(query); // Await the promise
    
        if (getAllUsers) {
            res.json({
               success : true,
                error : false,
                message : "Successfully! Record has been fetched",
                data : getAllUsers,
            });
        } else {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Post("/create")
    @UseGuards(AuthGuard())
    async createUser(
        @Body()
        Admin: createUserDto,
        @Res() res: Response
    ): Promise<void> {
        const createUser=await this.adminService.create(Admin);
        if(createUser){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been inserted.",
                 data : createUser,
             });
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/getById/:id')
    @UseGuards(AuthGuard())
    async getUserById(
        @Param('id')
        id: string,
         @Res() res: Response
    ): Promise<void> {
        const getUserById = await this.adminService.findById(id);
        if (getUserById) {
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been fetched",
                 data : getUserById,
             });
        } else {
            throw new HttpException('User with ID Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Put("/update/:id")
    @UseGuards(AuthGuard())
    async updateUser(
        @Param('id')
        id: string,
        @Body()
        Admin: updateUserDto,
        @Res() res: Response
    ): Promise<void> {
        const updateUser=  await this.adminService.updateById(id, Admin);
        if(updateUser){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been updated.",
                 data : updateUser,
             });
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/delete/:id')
    @UseGuards(AuthGuard())
    async deleteUserById(
        @Param('id')
        id: string,
        @Res() res: Response
    ): Promise<void> {
        const deleteUserById=await this.adminService.deleteById(id);

        if(deleteUserById){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been deleted.",
                 data : deleteUserById,
             });
        } else {
            throw new HttpException('No Record found', HttpStatus.NOT_FOUND);
        }
    }
}
