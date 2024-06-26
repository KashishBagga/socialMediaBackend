import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('name') name: string) {
    console.log("name", name);
    if (name) {
      return this.usersService.findByExactName(name);
    } else {
      return this.usersService.findAll();
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post(':id/follow/:followId')
  async followUser(@Param('id') userId: string, @Param('followId') followId: string) {
    return this.usersService.followUser(userId, followId);
  }

  @Post(':id/unfollow/:unfollowId')
  async unfollowUser(@Param('id') userId: string, @Param('unfollowId') unfollowId: string) {
    return this.usersService.unfollowUser(userId, unfollowId);
  }
}
