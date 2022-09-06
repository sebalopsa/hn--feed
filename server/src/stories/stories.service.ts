import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story, StoryDocument } from './schemas/story.schema';
//
export class StoriesService {
  constructor(
    @InjectModel(Story.name) private storyModel: Model<StoryDocument>,
  ) {}

  async create(createStoryDto: CreateStoryDto) {
    const createStory = new this.storyModel(createStoryDto);
    return createStory.save();
  }

  createMany(createStoriesDto: CreateStoryDto[]) {
    return this.storyModel.insertMany(createStoriesDto);
  }

  findAll() {
    return this.storyModel.find({ deleted: false });
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return this.storyModel.updateOne({ objectID: id }, updateStoryDto);
  }

  remove(id: number) {
    return this.storyModel.deleteOne({ objectID: id });
  }
}
