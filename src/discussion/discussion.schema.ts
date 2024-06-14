import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type DiscussionDocument = Discussion & Document;

@Schema()
export class Discussion extends Document {
  @Prop({ required: true })
  text: string;

  @Prop()
  image: string;

  @Prop([String])
  hashtags: string[];
  
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; // Reference to User

  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  comments: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Like' }])
  likes: Types.ObjectId[];
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion);
