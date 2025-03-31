"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterDto = void 0;
// src/users/dto/user-register.dto.ts
class UserRegisterDto {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
exports.UserRegisterDto = UserRegisterDto;
