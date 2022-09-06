import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesModule } from './stories/stories.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${
        process.env.NODE_ENV == 'production' ? 'db' : 'localhost'
      }:27017/hn-feed`,
    ),
    ScheduleModule.forRoot(),
    StoriesModule,
  ],
})
export class AppModule {}
