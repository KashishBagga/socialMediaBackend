import { Controller, Post, Delete, Param, UseGuards, BadRequestException, Request, Put, Body } from '@nestjs/common';
import { Types } from 'mongoose';
import { LikeService } from 'src/likes/like.service';
import { CommentService } from './comment.service';

@Controller('comments') // or 'replies'
export class CommentController { // or ReplyController
  constructor(
    private readonly likeService: LikeService,
    private readonly commentService: CommentService
  ) {}

  @Delete(':commentId')
  async deleteComment(
    @Request() req: any,
    @Param('commentId') commentId: string,
  ) {
    try {
      const userId = req.user.userId;
      await this.commentService.deleteComment(userId, new Types.ObjectId(commentId));
      return { message: 'Comment deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':commentId')
  async updateComment(
    @Request() req: any,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: any,
  ) {
    try {
      const userId = req.user.userId;
      const updatedComment = await this.commentService.updateComment(userId, new Types.ObjectId(commentId), updateCommentDto);
      return { message: 'Comment updated successfully', comment: updatedComment };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
  @Post(':commentId/likes')
  async createLike(
    @Request() req: any,
    @Param('commentId') commentId: string,
  ) {
    try {
      const userId = req.user.userId;
      const like = await this.likeService.createLike(userId, commentId);
      return { message: 'Like created successfully', like };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':commentId/likes')
  async deleteLike(
    @Request() req: any,
    @Param('commentId') commentId: string,
  ) {
    try {
      const userId = req.user.userId;
      await this.likeService.deleteLike(userId, new Types.ObjectId(commentId));
      return { message: 'Like deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post(':commentId/replies')
  async createReply(
    @Param('commentId') commentId: string,
    @Body() createReplyDto: any
  ) {
    createReplyDto.parentId = commentId; // Assign parentId from route parameter
    const userId = 'userIdFromToken'; // You should extract this from the JWT token in a real application
    return this.commentService.createReply(new Types.ObjectId(userId), createReplyDto);
  }
}
