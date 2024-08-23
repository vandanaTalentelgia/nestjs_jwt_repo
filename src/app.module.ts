import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
      envFilePath: '.env', // Ensure the correct path
   
  }),MongooseModule.forRoot(process.env.BASE_URL),  UserModule,AdminModule,FormModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
