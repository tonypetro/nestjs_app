import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductsController } from './products.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from '../../entities/product.entity'
import { PaginationService } from 'src/common/pagination.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductService, PaginationService],
})
export class ProductModule {}
