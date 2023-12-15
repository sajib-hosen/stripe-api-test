import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutModule } from '../checkout/checkout.module';
import { UsersModule } from '../users/users.module';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    CheckoutModule,
    UsersModule,
    StripeModule.forRoot({
      apiKey: `sk_test_51JvmcsJo0yUa2i13PXtjHotQKfXKwq5iHWa5X6UomNWqAqt8HjkRaf6HJAs2pP7LrkGywUxrvVOWNp58mNReUoio00ayEFAKgR`,
      apiVersion: '2023-10-16',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
