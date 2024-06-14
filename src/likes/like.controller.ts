import { Controller, Post, Delete, Param, UseGuards, BadRequestException, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikeService } from './like.service';
import { Types } from 'mongoose';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':targetId')
  async createLike(
    @Request() req: any,
    @Param('targetId') targetId: string,
  ) {
    try {
      const userId = req.user.userId;
      const like = await this.likeService.createLike(userId, targetId);
      return { message: 'Like created successfully', like };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':targetId')
  async deleteLike(
    @Request() req: any,
    @Param('targetId') targetId: string,
  ) {
    try {
      const userId = req.user.userId;
      await this.likeService.deleteLike(userId, new Types.ObjectId(targetId));
      return { message: 'Like deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
