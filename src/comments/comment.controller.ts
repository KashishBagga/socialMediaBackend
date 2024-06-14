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
  @Post(':commentId/likes')
  async createLike(
    @Body('userId') userId: string,
    @Param('commentId') commentId: string,
  ) {
    try {
      console.log('userId', userId, 'commentId', commentId);
      const like = await this.likeService.createCommentLike(userId, commentId);
      return { message: 'Like created successfully', like };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
  @Delete(':commentId')
  async deleteComment(
    @Request() req: any,
    @Param('commentId') commentId: string,
  ) {
    try {
      await this.commentService.deleteComment(new Types.ObjectId(commentId));
      return { message: 'Comment deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: any,
  ) {
    try {
      const updatedComment = await this.commentService.updateComment(new Types.ObjectId(commentId), updateCommentDto);
      return { message: 'Comment updated successfully', comment: updatedComment };
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
    try {
      // Validate commentId format (should be a valid ObjectId)
      console.log("creat", createReplyDto, commentId)
      if (!Types.ObjectId.isValid(commentId)) {
        throw new BadRequestException('Invalid commentId format');
      }
      createReplyDto.parentId = commentId; // Assign parentId from route parameter
      const userId = createReplyDto.userId; // Replace with actual user ID extraction from JWT

      // Pass valid ObjectId to service method
      return this.commentService.createReply(new Types.ObjectId(userId), createReplyDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
