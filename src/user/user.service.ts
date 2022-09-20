import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async createUser(createUserDto: CreateUserInput): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async updateUser(updateUserDto: UpdateUserInput): Promise<User> {
    const updateOfUser = {
      name: updateUserDto.name,
      phone: updateUserDto.phone,
      password: updateUserDto.password
    };
    return await this.userModel.findByIdAndUpdate(updateUserDto._id, { $set: updateOfUser }, { new: true }).lean().exec();
  }
}
