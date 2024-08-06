import * as  mongoose from 'mongoose';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signup.dto';
import {loginDto} from './dto/login.dto';
@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) 
    private userModel: mongoose.Model<User>,
    private  jwtService:JwtService
    
    ) 
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
        const user = await this.userModel.findById(id);
        if(!user){
          throw new NotFoundException('User not found');
        }
        return user;
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
 

      async signUp(signUpDto:signUpDto): Promise<{token :string}>{
        const {name,email,password} =signUpDto
        const hashPassword =await bcrypt.hash(password,10);

       const user=await this.userModel.create({
        name,
        email,
        password: hashPassword
      })
      const token =this.jwtService.sign({id:user._id});
      return {token};

      }
      

      async login(loginDto: loginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
        
        const user = await this.userModel.findOne({ email });
        
        if (!user) {
          throw new UnauthorizedException('Email or password is invalid');
        }
      
        const checkPassword = await bcrypt.compare(password, user.password);
        
        if (!checkPassword) {
          throw new UnauthorizedException('Email or password is invalid');
        }
      
        if (!mongoose.Types.ObjectId.isValid(user._id)) {
          throw new InternalServerErrorException('Invalid user ID');
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token };
      }
}
