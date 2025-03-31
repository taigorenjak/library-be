import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from '../auth/user-register.dto';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './entity/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
        return this.usersService.create(userRegisterDto);
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<User | null> {
        return this.usersService.findByEmail(email);
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<User> {
        return this.usersService.findById(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<{ message: string }> { // <- Popravljeno
        return this.usersService.remove(id);
    }
}