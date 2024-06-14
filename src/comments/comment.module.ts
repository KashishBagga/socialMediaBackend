import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './comment.schema';
import { Discussion, DiscussionSchema } from 'src/discussion/discussion.schema';
import { LikeModule } from 'src/likes/like.module';
import { CommentController } from './comment.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Discussion.name, schema: DiscussionSchema }]),
    LikeModule
  ],
  controllers:[CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
