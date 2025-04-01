import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title!: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @IsNotEmpty()
  @IsString()
  author!: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @IsNotEmpty()
  @IsInt()
  year!: number;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @IsNotEmpty()
  @IsString()
  genre!: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  @IsOptional()
  @IsString()
  description?: string;  // Dodajemo '!' za zagotavljanje, da bo vrednost inicializirana kasneje

  constructor(partial: Partial<CreateBookDto>) {
    Object.assign(this, partial);
  }
}