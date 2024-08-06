import * as  mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) 
    private userModel: mongoose.Model<User>) 
    {}

    async findAll(): Promise<User[]> {
        const users= await this.userModel.find();
        return users;
      }


      async create(user: User): Promise<User> {
        const res = await this.userModel.create(user);
        return res;
      }

      async findById(id: string): Promise<User> {
        const book = await this.userModel.findById(id);
        if(!book){
          throw new NotFoundException('User not found');
        }
        return book;
      }

      async updateById(id: string,user:User): Promise<User> {
       return await this.userModel.findByIdAndUpdate(id,user,{
          new:true,
          runValidators:true,
        });
      }

      async deleteById(id: string): Promise<User> {
        const book = await this.userModel.findByIdAndDelete(id);
        if(!book){
          throw new NotFoundException('User not found');
        }
        return book;
      }
}
