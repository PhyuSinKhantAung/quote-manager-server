import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveQuoteDto } from './dtos';
import { Quote } from './types';
import { QueryQuoteDto } from './dtos/queryQuote.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuoteService {
  constructor(private prisma: PrismaService) {}

  async saveQuote(quote: SaveQuoteDto, userId: string): Promise<Quote> {
    return await this.prisma.quote.create({
      data: {
        ...quote,
        userId,
      },
    });
  }

  async deleteQuote(id: string, userId: string): Promise<Quote> {
    return await this.prisma.quote.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async getQuotes(
    query: QueryQuoteDto,
    userId: string,
  ): Promise<{
    data: Quote[];
    count: number;
  }> {
    const page = query.page * 1 || 1;
    const take = query.limit === 0 ? query.limit : query.limit * 1 || 10;
    const skip = (page - 1) * take;

    const where: Prisma.QuoteWhereInput = {
      userId,
    };

    if (query.search) {
      where.OR = [
        {
          content: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const quotesPromise = this.prisma.quote.findMany({
      where,
      skip,
      take,
    });

    const countPromise = this.prisma.quote.count({
      where,
    });

    const [data, count] = await Promise.all([quotesPromise, countPromise]);

    return {
      data,
      count,
    };
  }
}
