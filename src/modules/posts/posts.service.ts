import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: any): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findByTags(tags: string[]): Promise<Post[]> {
    return this.postModel.find({ hashTags: { $in: tags } }).exec();
  }

  async findByText(text: string): Promise<Post[]> {
    return this.postModel.find({ text: new RegExp(text, 'i') }).exec();
  }

  async updatePost(id: string, updatePostDto: any): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
  }

  async deletePost(id: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
