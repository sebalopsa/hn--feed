import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story, StoryDocument } from './schemas/story.schema';
import { HttpService } from '@nestjs/axios';
import { map, take } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

const API_URL = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
    private readonly httpService: HttpService,
  ) {}

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
    let data = await lastValueFrom(
      this.httpService.get(API_URL).pipe(
        take(1),
        map((response) => response.data.hits as CreateStoryDto[]),
      ),
    );
    return this.createMany(data);
  }

  findAll() {
    return this.storyModel.find({ deleted: false }).sort({ created_at: -1 });
  }

  update(id: string, updateStoryDto: UpdateStoryDto) {
    return this.storyModel.updateOne({ objectID: id }, updateStoryDto);
  }

  remove(id: number) {
    return this.storyModel.deleteOne({ objectID: id });
  }

  removeAll() {
    return this.storyModel.deleteMany({});
  }
}
