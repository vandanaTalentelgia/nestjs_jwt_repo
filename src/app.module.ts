import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
require ('dotenv'). config ();
@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }), MongooseModule.forRoot("mongodb://localhost:27017/userDatabase") ,  UserModule,],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
