import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { extname } from 'path';

@Injectable()
export class FilesService {
  // Используем абсолютный путь к проекту
  private readonly uploadPath = path.resolve(process.cwd(), 'uploads');

  async saveFile(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File buffer is missing');
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = extname(file.originalname);
    const fileName = `${uniqueSuffix}${fileExt}`;
    const filePath = path.join(this.uploadPath, fileName);

    try {
      // Проверяем, существует ли папка, и создаем ее при необходимости
      await fs.mkdir(this.uploadPath, { recursive: true });

      // Сохраняем файл
      await fs.writeFile(filePath, file.buffer);

      console.log(`File saved successfully: ${filePath}`);
      return `/uploads/${fileName}`;
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('An error occurred while saving the file');
    }
  }

  async deleteFile(filename: string): Promise<string> {
    const sanitizedFilename = path.basename(filename);
    const filePath = path.join(this.uploadPath, sanitizedFilename);

    try {
      await fs.unlink(filePath);
      console.log(`File deleted successfully: ${filePath}`);
      return `Файл ${sanitizedFilename} был успешно удален`;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.error(
          `File ${sanitizedFilename} not found in directory ${this.uploadPath}`,
        );
        throw new NotFoundException(`Файл ${sanitizedFilename} не найден`);
      } else {
        console.error(`Error deleting file ${sanitizedFilename}:`, error);
        throw new Error('Произошла неизвестная ошибка при удалении файла');
      }
    }
  }
}
