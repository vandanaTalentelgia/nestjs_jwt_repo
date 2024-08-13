import { Module } from '@nestjs/common';
import { Feature1Controller } from './feature1.controller';
import { Feature1Service } from './feature1.service';
import {ModuleSchema} from './schemas/feature1.schemas'
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
  MongooseModule.forFeature([{ name: "Module", schema: ModuleSchema }]),
  UserModule
],
  controllers: [Feature1Controller],
  providers: [Feature1Service]
})
export class Feature1Module {
  // constructor(){
  // }
}
