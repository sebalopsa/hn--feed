import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { of } from 'rxjs';
import { Story } from './schemas/story.schema';
import { StoriesService } from './stories.service';

export class StoryModelFake {
  public create(): void {}
  public async save(): Promise<void> {}
  public async remove(): Promise<void> {}
  public async findOne(): Promise<void> {}
}

const moduleMocker = new ModuleMocker(global);
describe('StoriesService', () => {
  let service: StoriesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesService,
        {
          provide: getModelToken(Story.name),
          useValue: StoryModelFake,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({})),
          },
        },
      ],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
