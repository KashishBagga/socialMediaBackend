// discussion.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Discussion, DiscussionDocument } from './discussion.schema';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel(Discussion.name) private readonly discussionModel: Model<DiscussionDocument>,
  ) {}

  
  async createDiscussion(createDiscussionDto: any, userId: string): Promise<Discussion> {
    const createdDiscussion = new this.discussionModel({ ...createDiscussionDto, userId });
    return createdDiscussion.save();
  }
  async updateDiscussion(id: string, update: Partial<Discussion>, userId: string): Promise<Discussion | null> {
    // Ensure userId is added to the update
    const updateWithUserId = { ...update, userId };

    // Update and return the updated discussion
    return this.discussionModel.findByIdAndUpdate(id, updateWithUserId, { new: true }).exec();
  }

  async deleteDiscussion(id: string): Promise<void> {
    const result = await this.discussionModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Discussion with ID ${id} not found`);
    }
  }

  async findDiscussionsByTags(tags: string[]): Promise<Discussion[]> {
    console.log("tags", tags);
    return this.discussionModel.find({ hashtags: { $in: tags } }).exec();
  }

  async findDiscussionsByText(searchText: string): Promise<Discussion[]> {
    return this.discussionModel.find({ text: { $regex: searchText, $options: 'i' } }).exec();
  }
}
