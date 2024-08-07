import * as  mongoose from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
@Injectable()
export class UserService {

  constructor(@InjectModel(User.name)
  private userModel: mongoose.Model<User>,
    private jwtService: JwtService

  ) { }

  async signUp(signUpDto: signUpDto): Promise<{ token: string }> {
    try {
      const { name, email, password } = signUpDto
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashPassword
      })
      const token = this.jwtService.sign({ id: user._id });
      return { token };
      
    } catch (error) {
      if (error.code === 11000) {  // MongoDB duplicate key error code
        throw new BadRequestException('Duplicate email entered');
      }
      return error;
    }
  }


  async login(loginDto: loginDto): Promise<{ token: string }> {
    try {

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
    } catch (error) {
      return error;
    }
  }
}
