import { CreatePostDto } from './dto/create-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post ) {}

    async create(dto: CreatePostDto, image: any) {
        const fileName = 'd'
        const post = await this.postRepository.create({...dto, image: fileName})
        return post
    }
}
