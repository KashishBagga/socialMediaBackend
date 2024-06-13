import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  image: string;

  @Prop({ type: [String] })
  hashTags: string[];

  @Prop({ default: Date.now })
  createdOn: Date;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: [] })
  likes: string[];

  @Prop({ default: [] })
  comments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
