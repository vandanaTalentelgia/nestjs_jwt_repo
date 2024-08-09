import { Module } from '@nestjs/common';
import { Feature1Controller } from './feature1.controller';
import { Feature1Service } from './feature1.service';
import {ParentSchema} from './schemas/feature1.schemas'
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[ 
    JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(config: ConfigService)=>{
      return {
        secret: config.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn: config.get<string>('JWT_EXPIRE'),
        }
      }
    }
  }),
  MongooseModule.forFeature([{ name: "Parent", schema: ParentSchema }]),
  UserModule
],
  controllers: [Feature1Controller],
  providers: [Feature1Service]
})
export class Feature1Module {
  constructor(){
    console.log('feature 1 sub module of admin');
  }
}
