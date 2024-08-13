import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    //swagger configuration
    
    const options= new DocumentBuilder()
   .setTitle('Nestjs-Api-collection')
   .setDescription('nestjs documention of react js project')
   .setVersion('1.0')
   .addBearerAuth({
    type:'http',
    scheme:'bearer',
    bearerFormat: 'jwt',
    name:'JWT',
    description:'JWT token required to access admin section apis',
    in:"header"
   }, 'JWT-auth').build();
   const document =SwaggerModule.createDocument(app,options);
   SwaggerModule.setup("api",app,document);


  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_BASE_URL, // Replace with the actual URL of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
