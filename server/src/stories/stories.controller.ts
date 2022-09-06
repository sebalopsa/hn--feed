import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  createMany(@Body() createStoriesDto: CreateStoryDto[]) {
    return this.storiesService.createMany(createStoriesDto);
  }

  @Post('hydrate-database')
  hydrateDatabase() {
    return this.storiesService.hydrateDatabase();
  }

  @Get()
  findAll() {
    return this.storiesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storiesService.update(id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storiesService.remove(+id);
  }
  @Delete()
  removeAll() {
    return this.storiesService.removeAll();
  }
}
