import { IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    password?: string;
}