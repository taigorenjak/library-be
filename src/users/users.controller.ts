import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDto } from '../auth/user-register.dto'; // Preveri pravilno pot
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Registracija uporabnika
    @Post('register')
    async register(@Body() userRegisterDto: UserRegisterDto): Promise<User> {
        return this.usersService.create(userRegisterDto);
    }

    // Iskanje uporabnika po ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findById(id);
    }

    // Iskanje uporabnika po emailu
    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<User> {
        return this.usersService.findByEmail(email);
    }
}