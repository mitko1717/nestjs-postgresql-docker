import { PostsService } from './posts.service';
import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor (private postService: PostsService) {}

    @Post('/')
    createPost (@Body() dto: CreatePostDto,
                // embed decorator for work with files
                @UploadedFile() image) {
        this.postService.create(dto, image)
    }
}
