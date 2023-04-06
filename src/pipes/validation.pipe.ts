import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidateException } from "src/exceptions/validation.exception";

// pipes for validate and transform incoming data before it reaches the handler function
// Pipes can be used to transform the data type, validate data, perform data conversion etc

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        // plainToClass converts plain object to class (constructor) object for validation
        const obj = plainToClass(metadata.metatype, value)
        const errors = await validate(obj)

        if (errors.length) {            
            let messages = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidateException(messages)
        }
        
        return value
    }
}