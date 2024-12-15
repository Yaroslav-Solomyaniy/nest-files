import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { FilesModule } from '../files/files.module'; // Импорт модуля для работы с файлами

@Module({
  imports: [FilesModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
