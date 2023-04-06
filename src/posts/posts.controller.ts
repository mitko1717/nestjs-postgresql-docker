import { PostsService } from './posts.service';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
    constructor (private postService: PostsService) {}

    @Post('/')
    // in FileInterceptor point name of variable where will be file
    @UseInterceptors(FileInterceptor('image'))
    createPost (@Body() dto: CreatePostDto,
                // embeded decorator for work with files
                @UploadedFile() image) {
        return this.postService.create(dto, image)
    }
}
