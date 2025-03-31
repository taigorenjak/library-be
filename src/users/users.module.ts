import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Dodaj import

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController], // Dodaj controllers
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule.forFeature([User])]
})
export class UsersModule {}