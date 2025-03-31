import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './user-register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: UserRegisterDto) {
        return this.authService.register(userDto);
    }

    @Post('login')
    async login(@Body() { email, password }: { email: string; password: string }) {
        return this.authService.login(email, password);
    }
}