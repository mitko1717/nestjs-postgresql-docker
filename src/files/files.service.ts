import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    async createFile (file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')            
            if (!fs.existsSync(filePath)) {
                // if nothing exists on this path, then create a folder
                fs.mkdirSync(filePath, { recursive: true })
            }

            // when sure that folder exists, add file
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName 
        } catch (e) {
            throw new HttpException('error with file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
