import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminSchema } from './schemas/admin.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports:[
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config: ConfigService)=>{
        return {
          secret: '93489348438hdhh',
          signOptions:{
            expiresIn: '7d',
          }
        }
      }
    }),
  UserModule,
  MongooseModule.forFeature([{ name: "User", schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
