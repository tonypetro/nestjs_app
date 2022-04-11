import { Module } from '@nestjs/common'
import { ClientModule } from './client/client.module'
import { ProductModule } from './product/product.module';

@Module({
  imports: [ClientModule, ProductModule],
})
export class AppApiModule {}
