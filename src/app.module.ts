import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGetway } from './chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGetway], //ADD CHAT GATEWAY TO PROVIDERS
})
export class AppModule { }
