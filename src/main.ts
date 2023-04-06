import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  // app instance via NestFactory
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('nest-js')
      .setDescription('documentation')
      .setVersion('1.0.0')
      .addTag('dima')
      .build()
  
      const document = SwaggerModule.createDocument(app, config)
      SwaggerModule.setup('/api/docs', app, document)
      // restrict access to all endpoits for all unauthorizated users
      // app.useGlobalGuards(new JwtAuthGuard())

  await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}

start();
