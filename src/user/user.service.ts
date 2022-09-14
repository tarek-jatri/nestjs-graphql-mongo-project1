import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { UserInput } from "./inputs/user.input";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async createUser(createUserDto: UserInput): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
