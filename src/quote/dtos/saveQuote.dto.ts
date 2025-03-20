import { IsNotEmpty, IsString } from 'class-validator';

export class SaveQuoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}
