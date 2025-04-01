import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @Column()
  title!: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @Column()
  author!: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @Column()
  year!: number;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @Column()
  genre!: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @Column({ nullable: true })
  description?: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}