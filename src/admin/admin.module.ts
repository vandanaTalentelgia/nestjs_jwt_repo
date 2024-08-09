import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminSchema } from './schemas/admin.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Feature1Module } from './feature1/feature1.module';
import { Feature2Module } from './feature2/feature2.module';
import { JwtStrategy } from 'src/user/jwt.strategy'; 
import { PassportModule } from '@nestjs/passport';
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
  UserModule,
  MongooseModule.forFeature([{ name: "User", schema: AdminSchema }]), Feature1Module,Feature2Module],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {
  constructor(){
    console.log('admin module');
  }
}
