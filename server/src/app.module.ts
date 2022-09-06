import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/hn-feed'),
    StoriesModule,
  ],
})
export class AppModule {}
