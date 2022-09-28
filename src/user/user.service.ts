import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DeleteUserInput } from './dto/delete-user.input';
import { GetOneUserInput } from './dto/get-one-user.input';
import { UserType } from './entities/user.type';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserInput): Promise<UserType> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getOneUser(getOneUserDto: GetOneUserInput): Promise<UserType> {
    const { username } = getOneUserDto;
    const user = await this.userModel
      .findOne({ phone: username })
      .lean()
      .exec();
    return user;
  }

  async updateUser(updateUserDto: UpdateUserInput): Promise<User> {
    const updateOfUser = {
      name: updateUserDto.name,
      phone: updateUserDto.phone,
      password: updateUserDto.password,
    };
    return await this.userModel
      .findByIdAndUpdate(
        updateUserDto._id,
        { $set: updateOfUser },
        { new: true },
      )
      .lean()
      .exec();
  }

  async deleteUser(deleteUserDto: DeleteUserInput): Promise<User> {
    return await this.userModel
      .findByIdAndDelete(deleteUserDto._id)
      .lean()
      .exec();
  }
}
