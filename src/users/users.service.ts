import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    // console.log("createdUser", createdUser)
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByExactName(name: string): Promise<User[]> {
    return this.userModel.find({ name }).exec();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
  async findOneByName(name: string): Promise<User | null> {
    console.log("name", name)
    return this.userModel.findOne({ name }).exec();
  }
  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async followUser(userId: string, followId: string): Promise<User> {
    const userObjectId = new Types.ObjectId(userId);
    const followObjectId = new Types.ObjectId(followId);

    const user = await this.userModel.findById(userObjectId);
    const followUser = await this.userModel.findById(followObjectId);

    if (!user || !followUser) {
      throw new NotFoundException('User not found');
    }

    if (!user.following.includes(followObjectId)) {
      user.following.push(followObjectId);
      followUser.followers.push(userObjectId);
      await followUser.save();
      await user.save();
    }

    return user;
  }

  async unfollowUser(userId: string, unfollowId: string): Promise<User> {
    const userObjectId = new Types.ObjectId(userId);
    const unfollowObjectId = new Types.ObjectId(unfollowId);

    const user = await this.userModel.findById(userObjectId);
    const unfollowUser = await this.userModel.findById(unfollowObjectId);

    if (!user || !unfollowUser) {
      throw new NotFoundException('User not found');
    }

    user.following = user.following.filter(followId => !followId.equals(unfollowObjectId));
    unfollowUser.followers = unfollowUser.followers.filter(followerId => !followerId.equals(userObjectId));

    await unfollowUser.save();
    await user.save();

    return user;
  }
}
