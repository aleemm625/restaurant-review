import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

import { createUserDto } from './Dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Post()
    async createUser(@Req() request: any, @Res() response: any, @Body() data: createUserDto) {
        try {
            if (!data?.first_name || !data?.last_name || !data?.email || !data?.password || !data?.role || !data?.gender) {
                throw 'Missing Fields!'
            }
            const whereClause = {
                email: data?.email
            }
            const dbUser = await this.userService.create(data)
            // const dbUser = await this.userService.findOneAndUpdate(
            //     whereClause,
            //     data,
            //     { new: true, upsert: true, runValidators: true })

            return response?.status(201)?.json(dbUser)
        } catch (e) {
            return response.status(400).json(e)
        }

    }

    @Get()
    async getAll(@Req() resquest: any, @Res() response: any) {
        try {
            const dbUsers = await this.userService.getAllUsers()
            return response.status(200).json(dbUsers);
        } catch (e) {
            return response?.status(400)?.json(e)
        }
    }
}
