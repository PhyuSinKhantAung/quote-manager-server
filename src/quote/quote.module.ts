import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuoteService } from './quote.service';

@Module({
  imports: [PrismaModule],
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService],
})
export class QuoteModule {}
