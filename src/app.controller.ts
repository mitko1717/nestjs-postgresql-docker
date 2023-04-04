// import { AppService } from './app.service';
import { Controller, Get } from "@nestjs/common";

@Controller('/api')
export class AppController {
    // to make controller work - nedd to register it in module

    // add service into instructor to use class object
    // nest response for creating

    // constructor(private appService: AppService) {}

    // controller shouldn't contain logic, only get request and return response
    @Get('/users')
    getUsers() {
        // return this.appService.getUsers()
    }
}