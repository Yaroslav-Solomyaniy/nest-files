import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './create-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto) {
    try {
      return await this.newsService.create(createNewsDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(
          `Ошибка при создании новости: ${error.message}`,
        );
      }
      throw new BadRequestException('Неизвестная ошибка при создании новости');
    }
  }

  @Get()
  async findAll() {
    return await this.newsService.findAll();
  }
}
