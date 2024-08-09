import { Body, Controller, Delete, Get, Res, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards , UploadedFile,
    UseInterceptors,} from '@nestjs/common';
import { ParentSchema } from './schemas/feature1.schemas';
import {Feature1Service  } from './feature1.service';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createFolderDto } from './dto/create-folder.dto';
import { createSubFolderDto } from './dto/create-subfolder.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('parents')
//to add category in the swagger
@ApiTags('Parent CRUD')
// Apply security to all Swagger functions; remove and add before specific functions to secure selectively
@ApiSecurity('JWT-auth')
export class Feature1Controller {
    constructor(private feature1Service: Feature1Service) { }

    @Get("/get")
    @UseGuards(AuthGuard())
    async getAllFolders(@Query() query: ExpressQuery, @Res() res: Response): Promise<void> {
        const getAllFolders = await this.feature1Service.findAll(query); // Await the promise
    
        if (getAllFolders) {
            res.json({
               success : true,
                error : false,
                message : "Successfully! Record has been fetched",
                data : getAllFolders,
            });
        } else {
            throw new HttpException('Folder Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Post("/parent-folder/create")
    @UseGuards(AuthGuard())
    // @UseInterceptors(FileInterceptor('file'))
    // @ApiConsumes('multipart/form-data')
    // @ApiBody({
    //     description: 'Folder creation data',
    //     schema: {
    //       type: 'object',
    //       properties: {
    //         name: { type: 'string' },
    //         file: {type: 'string',
    //         format: 'binary',},
    //       },
    //     },
    //   })
    async createFolder(
        // @UploadedFile() file: Express.Multer.File,
        @Body()
        name: createFolderDto,
        @Res() res: Response
    ): Promise<void> {
        // const { name } = parent;
        // const fileData = {
        //     originalName: file.originalname,
        //     mimetype: file.mimetype,
        //     buffer: file.buffer,
        //     size: file.size,
        //   };
        // const ParentData = { ...parent,name:name, file: fileData.originalName };
         const createFolder=await this.feature1Service.create(name);
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

    @Post("/child-folder/create")
    @UseGuards(AuthGuard())
    async createSubFolder(
        // @UploadedFile() file: Express.Multer.File,
        @Body()
        data: createSubFolderDto,
        @Res() res: Response
    ): Promise<void> {
         const createSubFolder=await this.feature1Service.create(data);
        if(createSubFolder){
            res.json({
                success : true,
                 error : false,
                 message : "Successfully! Record has been inserted.",
                 data : createSubFolder,
             });
        } else {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
