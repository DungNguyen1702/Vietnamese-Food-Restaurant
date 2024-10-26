import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('uploads')
export class UploadController {
    constructor(private readonly uploadService : UploadService){}
    @Post("/image")
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const result = await this.uploadService.uploadImage(file);
        return result;
    }

    @Post("/images")
    @UseInterceptors(FilesInterceptor('images', 10)) // Cho phép upload tối đa 10 files
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        const uploadResults = [];

        // Duyệt qua từng file và upload
        for (const file of files) {
            const result = await this.uploadService.uploadImage(file);
            uploadResults.push(result.url);
        }

        return uploadResults;
    }
}
