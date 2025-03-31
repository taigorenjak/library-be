"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entity/user.entity");
const users_service_1 = require("./users/users.service");
const users_controller_1 = require("./users/users.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST, // localhost
                port: parseInt(process.env.DB_PORT || '5432'), // 5432
                username: process.env.DB_USERNAME, // postgres
                password: process.env.DB_PASSWORD, // your_password_here
                database: process.env.DB_DATABASE, // library
                entities: [user_entity_1.User], // Seznam entitet, ki jih uporabljaš
                synchronize: true, // Nastavi na true za razvoj, sicer na false v produkciji
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), // Registriraj entiteto User
        ],
        providers: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    })
], AppModule);
