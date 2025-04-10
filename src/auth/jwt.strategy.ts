import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface'; // Nastavi lasten interface za payload
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,  // Pravilno injectaj servis za uporabnike
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Izvleče JWT iz glave
            ignoreExpiration: false,  // Nastavi na false, da preveriš iztek datuma
            secretOrKey: 'your_secret_key', // Nastavi skrivni ključ za JWT
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.usersService.findById(payload.sub); // Najdi uporabnika z ID iz payload
        if (!user) {
            throw new Error('User not found');  // Če uporabnik ni najden, vrni napako
        }
        return user;
    }
}