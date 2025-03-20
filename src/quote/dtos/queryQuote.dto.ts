import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryQuoteDto {
  @IsInt()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : value), {
    toClassOnly: true,
  }) // Transform string to number
  page: number;

  @IsInt()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : value), {
    toClassOnly: true,
  }) // Transform string to number
  limit: number;

  @IsOptional()
  @IsString()
  search: string;
}
