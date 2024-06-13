import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DiscussionDocument = Discussion & Document;

@Schema()
export class Discussion {
  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  image?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  hashtags: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdOn: Date;
}

export const DiscussionSchema = SchemaFactory.createForClass(Discussion);
