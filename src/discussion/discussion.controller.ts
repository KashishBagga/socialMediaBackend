// discussion.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DiscussionService } from './discussion.service';
import { Types } from 'mongoose';

@Controller('discussions')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createDiscussion(@Body() createDiscussionDto: any) {
    return this.discussionService.createDiscussion(createDiscussionDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateDiscussion(@Param('id') id: string, @Body() updateDiscussionDto: any) {
    return this.discussionService.updateDiscussion(id, updateDiscussionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteDiscussion(@Param('id') id: string) {
    return this.discussionService.deleteDiscussion(id);
  }

  @Get('tags')
  async getDiscussionsByTags(@Query('tags') tags: string[]) {
    const tagIds = tags.map(tag => new Types.ObjectId(tag));
    return this.discussionService.findDiscussionsByTags(tagIds);
  }

  @Get('search')
  async searchDiscussionsByText(@Query('text') searchText: string) {
    return this.discussionService.findDiscussionsByText(searchText);
  }
}
