import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    password?: string;

    @IsNotEmpty()
    name?: string;
}