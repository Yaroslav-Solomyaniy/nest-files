import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './create-news.dto';

@Injectable()
export class NewsService {
  private news = [];

  create(newsData: CreateNewsDto) {
    const newNews = { id: this.news.length + 1, ...newsData };
    this.news.push(newNews);
    return newNews;
  }

  findAll() {
    return this.news;
  }
}
