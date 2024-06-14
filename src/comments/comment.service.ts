import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async deleteComment(userId: Types.ObjectId, commentId: Types.ObjectId): Promise<void> {
    const comment = await this.commentModel.findOne({ _id: commentId, userId }).exec();
    if (!comment) {
      throw new NotFoundException('Comment not found or you are not authorized to delete');
    }
    await this.commentModel.deleteOne({ _id: commentId, userId }).exec(); // Correct method to delete the document
  }

  async updateComment(userId: Types.ObjectId, commentId: Types.ObjectId, updateCommentDto: any): Promise<Comment> {
    const comment = await this.commentModel.findOne({ _id: commentId, userId }).exec();
    if (!comment) {
      throw new NotFoundException('Comment not found or you are not authorized to update');
    }

    comment.set(updateCommentDto); // Use the `set` method to update properties
    return await comment.save();
  }

  async createReply(userId: Types.ObjectId, createReplyDto: any): Promise<Comment> {
    const parentComment = await this.commentModel.findById(createReplyDto.parentId).exec();
    if (!parentComment) {
      throw new NotFoundException('Parent comment not found');
    }
  
    const reply = new this.commentModel({
      userId,
      content: createReplyDto.content,
      replies: [],
      likes: [],
    });
  
    const savedReply = await reply.save();
  
    // Ensure the type of _id is ObjectId
    parentComment.replies.push(savedReply._id as Types.ObjectId);
    await parentComment.save();
  
    return savedReply;
  }
  
}
