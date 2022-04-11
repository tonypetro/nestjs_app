import { Controller, Get, Post, Body, Put, Param, Delete, Res, Inject, Req, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { BaseController } from '../base.controller'
import { Response } from 'express'
import { Request } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiPaginateDto, ApiPaginateObjDto, ResponsePaginationDto, ResponsePaginationObjDto } from '../../common/dto/pagination.dto'
import { ResponseClientDto } from './dto/response-client.dto'
import { ResponseClientDetailsDto } from './dto/response-client-details.dto'

//TODO: @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Clients')
@Controller('clients')
@ApiExtraModels(ResponsePaginationDto, ResponsePaginationObjDto, CreateClientDto, UpdateClientDto)
export class ClientsController extends BaseController {
  @Inject(ClientService)
  public clientService: ClientService

  @Get()
  @ApiPaginateDto({ status: 200, description: 'All clients were successfully returned.', type: ResponseClientDto })
  async findAll(@Req() req, @Res() res: Response) {
    const clients = await this.clientService.findAll(req)
    return this.success(res, clients)
  }

  @Post()
  @ApiPaginateObjDto({ status: 200, description: 'The client was successfully created.', type: ResponseClientDto })
  async create(@Body() createClientDto: CreateClientDto, @Res() res) {
    const client = await this.clientService.create(createClientDto)
    return this.success(res, client)
  }

  @Get(':id')
  @ApiPaginateObjDto({ status: 200, description: 'The client successfully returned.', type: ResponseClientDetailsDto })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const client = await this.clientService.findOne(id)
    return this.success(res, client)
  }

  @Put(':id')
  @ApiPaginateObjDto({ status: 200, description: 'The client was successfully updated.', type: ResponseClientDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto, @Res() res: Response) {
    const client = await this.clientService.update(id, updateClientDto)
    return this.success(res, client)
  }

  @Delete(':id')
  @ApiPaginateObjDto({ status: 200, description: 'The client was successfully deleted.', type: ResponseClientDto })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.remove(id)
  }
}
