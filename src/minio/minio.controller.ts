import { BadRequestException, Controller, Get, InternalServerErrorException, Post, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { MinioFileService } from "./minioFile.service";
import { Response } from 'express'
import { AuthGuard } from "src/auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('file')
export class MinioController {
    constructor(private readonly minioService : MinioFileService){}

    @Post()
    // @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, userId : number, categoryId : number,@Res() res : Response) {
        try {
            if(file){
                console.log(file.mimetype);
                
                await this.minioService.uploadFile(file,file.fieldname,userId,categoryId);
                return res.status(200).json({
                    code : "SUCESS",
                    message :"Upload success",
                    data: file.filename
                })
            } else {
                throw new BadRequestException('File not found')
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Could not upload file")
        }
    }
}
