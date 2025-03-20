import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuoteService } from './quote.service';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { SaveQuoteDto } from './dtos';
import { QueryQuoteDto } from './dtos/queryQuote.dto';

@Controller('quotes')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @UseGuards(JwtGuard)
  @Get('/favorites')
  async getQuotes(
    @GetUser('id') userId: string,
    @Query() query: QueryQuoteDto,
  ) {
    return await this.quoteService.getQuotes(query, userId);
  }

  @UseGuards(JwtGuard)
  @Post('/favorites')
  async saveQuote(@GetUser('id') userId: string, @Body() quote: SaveQuoteDto) {
    return await this.quoteService.saveQuote(quote, userId);
  }

  @UseGuards(JwtGuard)
  @Delete('/favorites/:id')
  async deleteQuote(@GetUser('id') userId: string, @Param('id') id: string) {
    return await this.quoteService.deleteQuote(id, userId);
  }

  @Get('/random')
  async getRandomQuote() {
    const randomQuoteResponse = await fetch(
      'https://dummyjson.com/quotes/random',
    );
    const randomQuote = await randomQuoteResponse.json();

    return randomQuote;
  }
}
