import * as  mongoose from 'mongoose';
import { BadRequestException, FileValidator, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module } from './schemas/feature1.schemas';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class Feature1Service {

  constructor(@InjectModel(Module.name)
  private ModuleModel: mongoose.Model<Module>,
    private jwtService: JwtService

  ) { }

  async findAll(query: any): Promise<Module[]> {
    try {
      
      const folders = await this.ModuleModel.find(query).exec();
      
      return folders;
    } catch (error) {
      return error;
    }
  }


  async create(folder: Module): Promise<Module> {
    try {
      const res = await this.ModuleModel.create(folder);
      return res;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<Module> {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please enter valid id');
      }
      const folder = await this.ModuleModel.findById(id);

      if (!folder) {
        throw new NotFoundException('folder not found');
      }
      return folder;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<Module> {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please enter valid id');
      }
      const Module = await this.ModuleModel.findByIdAndDelete(id);
      if (!Module) {
        throw new NotFoundException('Module not found');
      }
      return Module;
    } catch (error) {
      return error;
    }
  }
}
