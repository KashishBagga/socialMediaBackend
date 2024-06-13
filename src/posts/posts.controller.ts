import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: any) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get('tags/:tags')
  async findByTags(@Param('tags') tags: string) {
    const tagsArray = tags.split(',');
    return this.postsService.findByTags(tagsArray);
  }

  @Get('search/:text')
  async findByText(@Param('text') text: string) {
    return this.postsService.findByText(text);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: any) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
