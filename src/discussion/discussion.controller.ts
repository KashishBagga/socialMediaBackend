// discussion.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, Request, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentService } from 'src/comments/comment.service';
import { LikeService } from 'src/likes/like.service';

@Controller('discussions')
export class DiscussionController {
  constructor(
    private readonly discussionService: DiscussionService,
    private readonly commentService: CommentService,
    private readonly likeService: LikeService,
  ) { }

  @Get('tags')
  async getDiscussionsByTags(@Query('tags') tags: string[]) {
    console.log("Tags", tags)
    // const tagIds = tags.map(tag => new String(tag));
    // console.log("tagIds", tagIds)
    return this.discussionService.findDiscussionsByTags(tags);
  }

  @Get('search')
  async searchDiscussionsByText(@Query('text') searchText: string) {
    return this.discussionService.findDiscussionsByText(searchText);
  }

  @Get(':id')
  async getDiscussionById(@Param('id') id: string) {
    return this.discussionService.getDiscussionById(id);
  }

  @Get(':id/view-count')
  async getViewCountById(@Param('id') id: string) {
    return this.discussionService.getViewCountById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createDiscussion(@Body() createDiscussionDto: any, @UploadedFile() file: Express.Multer.File, @Body('userId') userId: string) {
    console.log("createDiscussionDto", createDiscussionDto)
    if (file) {
      createDiscussionDto.image = file.path; // Add the file path to the DTO
    }
    return this.discussionService.createDiscussion(createDiscussionDto, userId);
  }

  @Put(':id')
  async updateDiscussion(
    @Param('id') id: string,
    @Body() updateDiscussionDto: any,
    @Body('userId') userId: string,
    @Request() req: any // Assuming you get user info from request
  ) {
    return this.discussionService.updateDiscussion(id, updateDiscussionDto, userId);
  }

  @Delete(':id')
  async deleteDiscussion(
    @Param('id') id: string,
    @Request() req: any, // Assuming user info from request
  ) {
    // Delete the discussion
    await this.discussionService.deleteDiscussion(id);

    return { message: `Discussion with ID ${id} has been deleted` };
  }

  @Post(':postId/comments')
  async createComment(@Param('postId') postId: string, @Body() createCommentDto: any) {
    createCommentDto.postId = postId;
    return this.commentService.createComment(createCommentDto);
  }

  @Post(':postId/like')
  async createLike(@Param('postId') postId: string, @Body('userId') userId: string) {
    console.log("postid", postId, userId)
    return this.likeService.createDiscussionLike(userId, postId);
  }

}
