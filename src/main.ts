require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import 'reflect-metadata'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ObjectLiteral } from 'typeorm'
import * as basicAuth from 'express-basic-auth'
import { localAuthMiddleware } from './middleware/local_auth.middleware'
import { join } from 'path'
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.use(localAuthMiddleware)
  app.enableCors()

  if (process.env.SWAGGER_USER && process.env.SWAGGER_PASSWORD) {
    const users: ObjectLiteral = {}
    users[process.env.SWAGGER_USER] = process.env.SWAGGER_PASSWORD
    app.use(
      ['/docs', '/docs-json'],
      basicAuth({
        challenge: true,
        users,
      }),
    )
    const config = new DocumentBuilder()
      .addBearerAuth()
      .addServer(process.env.HOST)
      .setTitle('KESH API Docs')
      .setDescription('The API descriptions')
      .setVersion('1.0')
      .addTag('kesh')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(PORT)
  console.log(`Listening at: http://localhost:${process.env.EXPOSED_PORT}`)
}
bootstrap()
