import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../auth/user-register.dto'; // Preveri pot do DTO
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>, // Popravljeno ime spremenljivke
    ) {}

    async create(user: UserRegisterDto): Promise<User> {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('Uporabnik z tem emailom ne obstaja');
        }
        return user;
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Uporabnik z tem ID-jem ne obstaja');
        }
        return user;
    }
}