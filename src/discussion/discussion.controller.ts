// discussion.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DiscussionService } from './discussion.service';
import { Types } from 'mongoose';

@Controller('discussions')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Post()
  async createDiscussion(@Body() createDiscussionDto: any) {
    console.log("createDiscussionDto", createDiscussionDto)
    return this.discussionService.createDiscussion(createDiscussionDto);
  }

  @Put(':id')
  async updateDiscussion(@Param('id') id: string, @Body() updateDiscussionDto: any) {
    return this.discussionService.updateDiscussion(id, updateDiscussionDto);
  }

  @Delete(':id')
  async deleteDiscussion(@Param('id') id: string) {
    return this.discussionService.deleteDiscussion(id);
  }

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
}
