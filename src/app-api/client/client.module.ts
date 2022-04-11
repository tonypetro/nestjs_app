import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientsController } from './clients.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from '../../entities/client.entity'
import { PaginationService } from 'src/common/pagination.service'

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientService, PaginationService],
})
export class ClientModule {}
