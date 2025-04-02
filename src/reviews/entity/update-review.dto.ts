import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;
}