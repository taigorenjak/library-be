import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}