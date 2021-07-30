import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { User, UserDocument } from "./Schemas/user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) { }

    public async create(data): Promise<User | any> {
        let dbUser = await this.UserModel.findOne({ email: data?.email })
        if (dbUser) {
            throw 'User already exists!'
        }
        dbUser = await this.UserModel.create(data)

        return dbUser.toJSON() || dbUser
    }

    public async findOneAndUpdate(
        whereClause: FilterQuery<User>,
        updateClause: UpdateQuery<User>,
        options: QueryOptions): Promise<User | any> {
        const dbUser = await this.UserModel.findOneAndUpdate(
            whereClause,
            updateClause,
            options)

        return dbUser
    }

    public async findAll(
        whereClause: FilterQuery<User> = {},
        updateClause: UpdateQuery<User> = {},
        options: QueryOptions = {}): Promise<User | any> {
        const dbUsers = await this.UserModel.find(whereClause, updateClause, options)

        return dbUsers
    }

    public async getAllUsers() {
        const dbUsers = await this.UserModel.find()

        if (!dbUsers) {
            throw 'User not Found!'
        }

        return dbUsers
    }

}