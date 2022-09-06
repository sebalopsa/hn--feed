import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story, StoryDocument } from './schemas/story.schema';
import { HttpService } from '@nestjs/axios';
import { map, take } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';

const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    private readonly httpService: HttpService,
  ) {
    this.hydrateDatabase();
  }

  async create(createStoryDto: CreateStoryDto) {
    const createStory = new this.storyModel(createStoryDto);
    return createStory.save();
  }

  async createMany(createStoriesDto: CreateStoryDto[]) {
    let stored = await this.storyModel.find({
      objectId: { $in: [createStoriesDto.map((el) => el.objectID)] },
    });
    let toStore = createStoriesDto.filter(
      (el) => !stored.map((el) => el.objectID).includes(el.objectID),
    );

    return this.storyModel.insertMany(toStore);
  }

  async hydrateDatabase() {
    this.logger.debug('Hydrating database');
    let data = await lastValueFrom(
      this.httpService.get(API_URL).pipe(
        take(1),
        map((response) => response.data.hits as CreateStoryDto[]),
      ),
    );
    return this.createMany(data);
  }

  findAll() {
    this.logger.debug('Find all documents');
    return this.storyModel.find({ deleted: false }).sort({ created_at: -1 });
  }

  update(id: string, updateStoryDto: UpdateStoryDto) {
    this.logger.debug('Update document');
    return this.storyModel.updateOne({ objectID: id }, updateStoryDto);
  }

  remove(id: number) {
    return this.storyModel.deleteOne({ objectID: id });
  }

  removeAll() {
    this.logger.debug('Deleting all documents');
    return this.storyModel.deleteMany({});
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.hydrateDatabase();
  }
}
