import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: '.env', // Ensure the correct path
   
  }),MongooseModule.forRoot("mongodb://localhost:27017/userDatabase") ,  UserModule,],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
