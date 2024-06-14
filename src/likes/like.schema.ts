import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Like extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, required: true })
  targetId: Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
