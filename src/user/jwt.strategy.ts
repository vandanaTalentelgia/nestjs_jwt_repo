import { Injectable,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as  mongoose from 'mongoose';
import { User } from './schemas/user.schemas';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(  @InjectModel(User.name) private userModel: mongoose.Model<User>, ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // This extracts the JWT from the Authorization header
            ignoreExpiration: false,
            secretOrKey: '93489348438hdhh', // Replace with your secret key
        });
    }

    async validate(payload: any) {
        // Add your validation logic here
        const {id}=payload;
        const user =await this.userModel.findById(id);
        if(!user){
            throw new UnauthorizedException('Login first to access this');
        }
        return user;
    }
}