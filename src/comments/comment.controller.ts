import { Controller, Post, Delete, Param, UseGuards, BadRequestException, Request } from '@nestjs/common';
import { Types } from 'mongoose';
import { LikeService } from 'src/likes/like.service';

@Controller('comments') // or 'replies'
export class CommentController { // or ReplyController
  constructor(private readonly likeService: LikeService) {}

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
}
