// src/users/entity/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;  // Dodaj '!' za obvladovanje napake

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}