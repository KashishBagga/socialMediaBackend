import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Like' }] })
  likes: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
