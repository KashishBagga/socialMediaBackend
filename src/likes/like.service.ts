import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from './like.schema';
import { Discussion } from '../discussion/discussion.schema';
import { User } from 'src/users/users.schema';
import { Comment } from 'src/comments/comment.schema';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>,
    @InjectModel(Discussion.name) private discussionModel: Model<Discussion>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  // async createPostLike(postId: string, userId : string): Promise<Like> {

  //   const user = await this.userModel.findById(userId );
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const newLike = new this.likeModel({ userId: user._id, postId });
  //   const savedLike = await newLike.save();

  //   // Update discussion's likes array with the new like's ObjectId
  //   await this.discussionModel.findByIdAndUpdate(
  //     postId,
  //     { $push: { likes: savedLike._id } },
  //     { new: true }, // Return the updated document
  //   );

  //   return savedLike;
  // }

  async createDiscussionLike(userId: string, targetId: string): Promise<Like> {
    const like = new this.likeModel({
      userId: new Types.ObjectId(userId),
      targetId: new Types.ObjectId(targetId),
    });
    const savedLike = await like.save();

    const discussion = await this.discussionModel.findById(targetId);
    if (!discussion) {
      throw new NotFoundException('Discussion not found');
    }

    discussion.likes.push(savedLike._id as any); // Cast to any
    await discussion.save();

    return savedLike;
  }

  async createCommentLike(userId: string, targetId: string): Promise<Like> {
    const like = new this.likeModel({
      userId: new Types.ObjectId(userId),
      targetId: new Types.ObjectId(targetId),
    });
    const savedLike = await like.save();

    const comment = await this.commentModel.findById(targetId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    comment.likes.push(savedLike._id as any); // Cast to any
    await comment.save();

    return savedLike;
  }

  async deleteLike(userId: Types.ObjectId, targetId: Types.ObjectId): Promise<void> {
    const result = await this.likeModel.deleteOne({ userId, targetId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Like not found');
    }
  }
}
