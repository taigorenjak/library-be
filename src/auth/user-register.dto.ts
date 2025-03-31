// src/users/dto/user-register.dto.ts
export class UserRegisterDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}