import { Injectable, Inject, Req } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Client } from '../../entities/client.entity'
import { Repository } from 'typeorm'
import { PaginationService } from '../../common/pagination.service'

@Injectable()
export class ClientService {
  @Inject(PaginationService)
  public paginationService: PaginationService

  @InjectRepository(Client)
  private readonly repository: Repository<Client>

  async findAll(request: Request) {
    let query = this.paginationService.paginate({}, request)
    return this.repository.findAndCount(query)
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    let newClient = this.repository.create(createClientDto)
    let savedClient = await this.repository.save(newClient)
    return savedClient
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    try {
      let client = await this.repository.findOneOrFail(id)
      client = this.repository.merge(client, updateClientDto)
      client = await this.repository.save(client)
      return client
    } catch (error) {
      throw Error(error)
    }
  }

  async remove(id: number) {
    return await this.repository.softDelete(+id)
  }
}
