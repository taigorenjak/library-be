import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../../reviews/entity/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  year!: number;

  @Column()
  genre!: string;

  @Column()
  description!: string;

  @OneToMany(() => Review, (review) => review.book)
  reviews!: Review[];
}