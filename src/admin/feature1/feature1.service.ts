import * as  mongoose from 'mongoose';
import { BadRequestException, FileValidator, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Parent } from './schemas/feature1.schemas';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class Feature1Service {

  constructor(@InjectModel(Parent.name)
  private ParentModel: mongoose.Model<Parent>,
    private jwtService: JwtService

  ) { }

  async findAll(query: any): Promise<Parent[]> {
    try {
      const folders = await this.ParentModel.find(query).exec();
      return folders;
    } catch (error) {
      return error;
    }
  }


  async create(folder: Parent): Promise<Parent> {
    try {
      const res = await this.ParentModel.create(folder);
      return res;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<Parent> {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please enter valid id');
      }
      const folder = await this.ParentModel.findById(id);

      if (!folder) {
        throw new NotFoundException('folder not found');
      }
      return folder;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<Parent> {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please enter valid id');
      }
      const Parent = await this.ParentModel.findByIdAndDelete(id);
      if (!Parent) {
        throw new NotFoundException('Parent not found');
      }
      return Parent;
    } catch (error) {
      return error;
    }
  }
}
