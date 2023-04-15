import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

import { getDBClient } from '../utils/db-client';


@Module({
  imports: [ OrderModule ],
  providers: [ CartService, {
    provide: 'PG',
    useValue: getDBClient(),
  } ],
  controllers: [ CartController ]
})
export class CartModule {}
