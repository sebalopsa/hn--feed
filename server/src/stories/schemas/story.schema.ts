import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoryDocument = Story & Document;

@Schema()
export class Story {
  @Prop({ required: true, unique: true })
  story_id: number;
  @Prop()
  created_at: Date;
  @Prop({ default: false })
  deleted: Boolean;
  @Prop()
  title: string;
  @Prop()
  url: string;
  @Prop()
  author: string;
  @Prop()
  story_title: string;
  @Prop()
  story_url: string;
}

export const StorySchema = SchemaFactory.createForClass(Story);
