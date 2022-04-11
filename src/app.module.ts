import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppApiModule } from './app-api/app-api.module'
import { AppAuthModule } from './app-auth/app-auth.module'
import { AppController } from './app.controller'

@Module({
  imports: [TypeOrmModule.forRoot(), AppAuthModule, AppApiModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
