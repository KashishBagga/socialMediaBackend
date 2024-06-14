import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { Discussion } from '../discussion/discussion.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Discussion.name) private discussionModel: Model<Discussion>,
  ) {}

  async createComment(createCommentDto: any): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    const savedComment = await createdComment.save();

    // Update discussion's comments array with the new comment's ObjectId
    await this.discussionModel.findByIdAndUpdate(
      createCommentDto.postId,
      { $push: { comments: savedComment._id } },
      { new: true }, // Return the updated document
    );

    return savedComment;
  }
}
