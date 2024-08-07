import * as  mongoose from 'mongoose';
import { BadRequestException, FileValidator, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/admin.schemas';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AdminService {

  constructor(@InjectModel(User.name)
  private AdminModel: mongoose.Model<User>,
    private jwtService: JwtService

  ) { }

  async findAll(query: any): Promise<User[]> {
    try {
      const admins = await this.AdminModel.find(query).exec();
      return admins;
    } catch (error) {
      return error;
    }
  }


  async create(admin: User): Promise<User> {
    try {
      const res = await this.AdminModel.create(admin);
      return res;
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please enter valid id');
      }
      const Admin = await this.AdminModel.findById(id);

      if (!Admin) {
        throw new NotFoundException('Admin not found');
      }
      return Admin;
    } catch (error) {
      return error;
    }
  }

  async updateById(id: string, admin: User): Promise<User> {
    try {
      return await this.AdminModel.findByIdAndUpdate(id, admin, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      return error;
    }
  }

  async deleteById(id: string): Promise<User> {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please enter valid id');
      }
      const user = await this.AdminModel.findByIdAndDelete(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      return error;
    }
  }
}
