import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './like.service';
import { Like, LikeSchema } from './like.schema';
import { Discussion, DiscussionSchema } from 'src/discussion/discussion.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { LikeController } from './like.controller';
import { Comment, CommentSchema } from 'src/comments/comment.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: Discussion.name, schema: DiscussionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
  ],
  controllers : [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
