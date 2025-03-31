import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRegisterDto } from './user-register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}

    // Registracija uporabnika
    async register(userRegisterDto: UserRegisterDto): Promise<any> {
        const { email, password } = userRegisterDto;

        // Preverimo, če uporabnik že obstaja
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Shranimo uporabnika s kriptiranim geslom
        const hashedPassword = await bcrypt.hash(password, 10); // bcrypt za kriptiranje gesla
        const newUser = await this.usersService.create({
            ...userRegisterDto,
            password: hashedPassword,
        });

        // Generiramo JWT za novega uporabnika
        const payload = { email: newUser.email, sub: newUser.id };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
        };
    }

    // Prijava uporabnika
    async login(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Preverimo geslo
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generiramo JWT za prijavljenega uporabnika
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
        };
    }
}
