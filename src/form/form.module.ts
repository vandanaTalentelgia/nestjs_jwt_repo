import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { FormSchema } from './schemas/form.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'} ),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config: ConfigService)=>{
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn:config.get<string>('JWT_EXPIRE'),
          }
        }
      }
    }),
    MongooseModule.forFeature([{ name: "Form", schema: FormSchema }])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {
}
