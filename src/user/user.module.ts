import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'} ),
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
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [JwtStrategy,PassportModule]
})
export class UserModule {
  constructor(private configService: ConfigService) {
    console.log(configService.get<string>('DATABASE_HOST'))
    // return this.configService.get<string>('DATABASE_HOST');
  }


}
