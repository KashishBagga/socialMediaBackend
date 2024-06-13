// discussion.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Discussion, DiscussionDocument } from './discussion.schema';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel(Discussion.name) private readonly discussionModel: Model<DiscussionDocument>,
  ) {}

  async createDiscussion(discussion: Discussion): Promise<Discussion> {
    const createdDiscussion = new this.discussionModel(discussion);
    return createdDiscussion.save();
  }

  async updateDiscussion(id: string, update: Partial<Discussion>): Promise<Discussion | null> {
    return this.discussionModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteDiscussion(id: string): Promise<Discussion | null> {
    return this.discussionModel.findByIdAndDelete(id).exec();
  }

  async findDiscussionsByTags(tags: string[]): Promise<Discussion[]> {
    console.log("tags", tags);
    return this.discussionModel.find({ hashtags: { $in: tags } }).exec();
  }

  async findDiscussionsByText(searchText: string): Promise<Discussion[]> {
    return this.discussionModel.find({ text: { $regex: searchText, $options: 'i' } }).exec();
  }
}
