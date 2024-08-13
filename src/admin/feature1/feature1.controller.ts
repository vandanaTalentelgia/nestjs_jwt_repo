import { Body, Controller, Delete, Get, Res, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards , UploadedFile,
    UseInterceptors,} from '@nestjs/common';
import {Feature1Service  } from './feature1.service';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createModuleDto } from './dto/create-module.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('module')
//to add category in the swagger
@ApiTags('Module CRUD')
// Apply security to all Swagger functions; remove and add before specific functions to secure selectively
@ApiSecurity('JWT-auth')
export class Feature1Controller {
    constructor(private feature1Service: Feature1Service) { }

    @Get("/get")
    @UseGuards(AuthGuard())
    async getAllModules(@Query() query: ExpressQuery, @Res() res: Response): Promise<void> {
        const getAllModules = await this.feature1Service.findAll(query); // Await the promise
    
        if (getAllModules) {
            res.json({
               success : true,
                error : false,
                message : "Successfully! Record has been fetched",
                data : getAllModules,
            });
        } else {
            throw new HttpException('Folder Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Post("/create")
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: createModuleDto,
        description: 'Folder creation data',
        schema: {
          type: 'object',
          properties: {
            parent_id: { type: 'string' },
            name: { type: 'string' },
            file: {type: 'string',
            format: 'binary',},
          },
        },
      })
   
    async createModule(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: createModuleDto,
        @Res() res: Response
    ): Promise<void> {
        let fileData = {
            originalName: null,
            mimetype: null,
            buffer: null,
            size: null,
        };
    
        if (file && data.parent_id) {
            fileData = {
                originalName: file.originalname,
                mimetype: file.mimetype,
                buffer: file.buffer,  // Include buffer if you want to store file content
                size: file.size,
            };
        }
         // Assuming `name` is a property of `createModuleDto` and it's of type string
    const ParentData = { 
        parent_id: data.parent_id?data.parent_id:null,
        name: data.name,  // Extracting `name` from `createModuleDto`
        file: file && data.parent_id ?fileData.originalName :null
    };
         const createFolder=await this.feature1Service.create(ParentData);
        if(createFolder){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been inserted.",
                 data : createFolder,
             });
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/getById/:id')
    @UseGuards(AuthGuard())
    async getFolderById(
        @Param('id')
        id: string,
         @Res() res: Response
    ): Promise<void> {
        const getFolderById = await this.feature1Service.findById(id);
        if (getFolderById) {
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been fetched",
                 data : getFolderById,
             });
        } else {
            throw new HttpException('Folder with ID Not Found', HttpStatus.NOT_FOUND);
        }
    }


    @Delete('/delete/:id')
    @UseGuards(AuthGuard())
    async deleteFolderById(
        @Param('id')
        id: string,
        @Res() res: Response
    ): Promise<void> {
        const deleteFolderById=await this.feature1Service.deleteById(id);

        if(deleteFolderById){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been deleted.",
                 data : deleteFolderById,
             });
        } else {
            throw new HttpException('No Record found', HttpStatus.NOT_FOUND);
        }
    }

    
}
