import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entity/user.entity';
import { CreateUserDto } from '../users/entity/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;

        if (!password) {
            throw new Error('Password is required');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userEntity = this.userRepository.create({
            email,
            password: hashedPassword,
        });

        return await this.userRepository.save(userEntity);
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
}