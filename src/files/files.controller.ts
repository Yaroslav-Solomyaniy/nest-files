import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FilesService } from './files.service';

@Controller('upload')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() })) // Використовуємо memoryStorage
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.saveFile(file);
  }

  @HttpCode(200)
  @Delete()
  deleteFile(@Body('filename') filename: string) {
    return this.filesService.deleteFile(filename);
  }
}
